#include <boost/interprocess/streams/vectorstream.hpp>
#include <boost/iostreams/stream.hpp>
#include <iostream>
#include <outcome.hpp>

#include "pep10.hpp"
#include "asmb/pep10/highlight.hpp"
#include "asmb/pep10/create_driver.hpp"
#include "components/machine/processor_model.hpp"
#include "elf_tools/elf_helper.hpp"
#include "ex_registry.hpp"
#include "isa/pep10/from_elf.hpp"
#include "isa/pep10/local_machine.hpp"
#include "masm/registry.hpp"
#include "masm/project/project.hpp"
#include "masm/utils/listing.hpp"
#include "utils/convert.hpp"
#include "utils/format.hpp"

emscripten::val get_macro(registry& reg, std::string name) {
    auto v = reg.find(name);
    if(v.has_value()) return emscripten::val(*v);
    else return emscripten::val::undefined();
}

emscripten::val get_figure(registry& reg, std::string proc, uint16_t chapter, std::string fig) {
    auto v = reg.find(proc, chapter, fig);
    if(v.has_value()) return emscripten::val(*v);
    else return emscripten::val::undefined();
}

// Error codes that indicate success or failure of launcing the assembler.
// They do not indicate if the assembly task succeded.
enum class assemble_error_code {
    kComplete,
    kSourceMustBeText,
    kUnableToLookupOS,
};

// Get human readable versions of the assemble_error_code
std::string error_name(assemble_error_code code) {
    return std::string(magic_enum::enum_name(code));
}

// Encapsulate the user program, os, and the build temporaries.
// Project can have macros added, sources added, and can be queried for results/errors
// (behaviors provided by non-members, so that we can ref it with a shared_ptr)
struct project {
    std::string user{}, os{};
    std::shared_ptr<masm::project::project<uint16_t>> masm_project{};
};

// Create a fresh project with default macros loaded.
std::shared_ptr<project> init_project() {
    auto ex = registry::instance();

    // Create a project and load it will all necessary macros
    auto ptr = std::make_shared<project>();
    ptr->masm_project = masm::project::init_project<uint16_t>();
    for (const auto &macro : ex.macros())
        ptr->masm_project->macro_registry->register_macro(macro.name, macro.text, masm::MacroType::CoreMacro);
    return ptr;
}

// Attempt to install a user macro's text. Treutrns true on success, false otherwise.
bool register_user_macro(std::shared_ptr<project> project, std::string name, std::string text){
    return project->masm_project->macro_registry->register_macro(name, text, masm::MacroType::UserMacro);
}

// The text of the user program.
bool set_user_program(std::shared_ptr<project>&project, emscripten::val maybe_text){
     if (!maybe_text.isString()) return false;
     else project->user = maybe_text.as<std::string>();
     return true;
}

// The (optional) text of the operating system.
bool set_os(std::shared_ptr<project>&project, emscripten::val maybe_text){
     if (!maybe_text.isString()) return false;
     else project->os = maybe_text.as<std::string>();
     return true;
}

// Assemble a given project.
// If only a user program is present, then it will assemble_join with default OS.
// If only an OS is present, it assemble_os.
// If a user program and an OS are present, both will be passed to assemble_joint.
assemble_error_code assemble(std::shared_ptr<project> project)
{
    if(project->os.empty()) {
        auto lookup = registry::instance().find("pep10", 9, "00");
        if(!lookup.has_value()) return assemble_error_code::kUnableToLookupOS;
        project->os = (*lookup).elements.at(element_type::kPep);
    }

    using namespace asmb::pep10::driver;
    auto driver = make_driver();

    // Create source node for OS
    auto file_os = std::make_shared<masm::project::source_file>();
    file_os->name = "os";
    file_os->body = project->os;

    // Prevent assembly_joint with no user program.
    if(!project->user.empty()) {
        // Create source node for user program
        auto file_user = std::make_shared<masm::project::source_file>();
        file_user->name = "user";
        file_user->body = project->user;

        driver->assemble_joint(project->masm_project, file_os, file_user, masm::project::toolchain_stage::PACK);
    } else {
        driver->assemble_os(project->masm_project, file_os, masm::project::toolchain_stage::PACK);
    }

    return assemble_error_code::kComplete;
}

// Re-pack messages from assembler into a flat format understood by JS.
struct local_message {
    uint32_t line;
    masm::message_type level;
    std::string message;
};

// Return the higher severity between to severities.
masm::message_type max_severity(masm::message_type lhs, masm::message_type rhs){
    std::cout << magic_enum::enum_name(lhs) << magic_enum::enum_name(rhs) << std::endl;
    if((int) lhs < (int) rhs) return rhs;
    else return lhs;
}

// Return an array of all error messages, with error messages represented by local_messages.
emscripten::val errors(std::shared_ptr<project> project){
    auto top_level = project->masm_project->image->user;

    auto messages = project->masm_project->message_resolver->messages();
    if(messages.empty()) return emscripten::val::undefined();
    emscripten::val Array = emscripten::val::global("Array");
    auto message_array  = Array.new_();
    for(const auto& message : messages) {
        auto& [parent, line, message_body] = message;
        if (parent != top_level) continue;
        auto as_val = emscripten::val(local_message{line, message_body.type, message_body.message});
        message_array.call<void>("push", as_val);
    }
    return message_array;
}

// Get (formatted) object code bytes for the user.text section.
emscripten::val object_bytes(std::shared_ptr<project> project){
    auto bytes_result = elf_tools::section_as_bytes(project->masm_project->as_elf->image(), "user.text");
    if(!bytes_result.has_value()) return emscripten::val::undefined();
    return emscripten::val(utils::bytes_to_hex_string(bytes_result.value(),16, true));
}

// Get (raw) bytes of the output elf image.
emscripten::val elf_bytes(std::shared_ptr<project> project){
    auto &image = project->masm_project->as_elf->image();
    auto bytes = elf_tools::as_bytes(image);
    std::cout << bytes.size();
    emscripten::val Array = emscripten::val::global("Array");
    auto byte_array  = Array.new_();
    for(const auto& byte : bytes) byte_array.call<void>("push", byte);
    return byte_array;

}

// Generate a listing of the user program.
emscripten::val user_listing(std::shared_ptr<project> project) {
    if(!project->masm_project->image->user) return emscripten::val::undefined();
    auto string = masm::utils::generate_listing(project->masm_project->image->user);
    return emscripten::val(string);
}

// Generate a listing of the OS program.
emscripten::val os_listing(std::shared_ptr<project> project) {
    if(!project->masm_project->image->os) return emscripten::val::undefined();
    auto string = masm::utils::generate_listing(project->masm_project->image->os);
    return emscripten::val(string);
}

emscripten::val loadable_image(std::shared_ptr<project> project) {
    return emscripten::val(project->masm_project->as_elf);
}


// Needed for `run`
emscripten::val object_code_to_image(std::string string) {
    using namespace ELFIO;

    // Try and parse bytes, and give up if they fail to parse
    auto bytes =  utils::parse_object_bytes(string);
    if (bytes.empty()) return emscripten::val::undefined();

    auto project = init_project();
    assemble(project);
    auto elf = project->masm_project->as_elf;
    auto user_section = elf->image().sections.add("user.text");
    user_section->set_type(SHT_PROGBITS);
    user_section->set_flags(SHF_ALLOC | SHF_EXECINSTR | SHF_WRITE);
    user_section->set_addr_align(0x1);
    user_section->set_data((const char *)bytes.data(), bytes.size());
    
    return emscripten::val(elf);
}

// WARNING: bufAsInt **must** be an object declared on the module heap!!
// BEWARE: EVIL HACK BELOW
// I know that all pointers are ui32 in WASM. I also know that memory address as passed as
// js 'number'. So, I can just cast the integral value to a pointer, and it'll work.
emscripten::val elf_bytes_to_image(uint32_t bufAsInt, uint32_t size) {
    auto buf = reinterpret_cast<char*>(bufAsInt);
    boost::iostreams::basic_array_source<char> input_source(buf, size);
    boost::iostreams::stream<boost::iostreams::basic_array_source<char> > input_stream(input_source);
    std::istream wrap(input_stream.rdbuf());

    auto reader = std::make_shared<ELFIO::elfio>();
    if(!reader->load(wrap)) return emscripten::val::undefined();
    return emscripten::val(std::make_shared<masm::elf::AnnotatedImage<uint16_t>>(reader));
}

struct simulator {
    uint64_t max_steps = 100'00;
    std::shared_ptr<masm::elf::AnnotatedImage<uint16_t>> machine_image{nullptr};
    std::shared_ptr<isa::pep10::LocalMachine<false>> machine{nullptr};
};

void set_max_steps(std::shared_ptr<simulator> simulator, double max_steps) {
    simulator->max_steps = (uint64_t) max_steps;
}

std::shared_ptr<simulator> make_simulator() {
    return std::make_shared<simulator>(simulator{});
}

void set_program_image(std::shared_ptr<simulator> simulator, std::shared_ptr<masm::elf::AnnotatedImage<uint16_t>> machine_image) {
    simulator->machine_image = machine_image;
    simulator->machine = isa::pep10::machine_from_elf<false>(machine_image->image()).value();
    simulator->machine->init();
}

void set_charIn(std::shared_ptr<simulator> simulator, std::string text) {
    auto charIn_result = simulator->machine->input_device("charIn");
    if (charIn_result.has_error()) assert(0);
    auto charIn = charIn_result.value();
    std::vector<uint8_t> bytes{};
    bytes.assign(text.begin(), text.end());
    components::storage::buffer_input(*charIn, bytes);
}

emscripten::val get_charOut(std::shared_ptr<simulator> simulator) {
    auto charOut_result = simulator->machine->output_device("charOut");
    if (charOut_result.has_error()) return emscripten::val::undefined();
    auto charOut = charOut_result.value();
    auto bytes = components::storage::read_output(*charOut);
    std::ostringstream ss;
    std::copy(bytes.begin(), bytes.end(), std::ostream_iterator<uint8_t>(ss, ""));
    return emscripten::val(ss.str());
}

emscripten::val run(std::shared_ptr<simulator> simulator) {
    auto loaded = isa::pep10::load_user_program(simulator->machine_image->image(), simulator->machine, isa::pep10::Loader::kDiskIn);
    if(loaded.has_error()) return emscripten::val::undefined();
    auto ret = isa::pep10::run(simulator->machine, simulator->max_steps);
    if(!ret.has_value()) return emscripten::val::undefined();
    else return emscripten::val(ret.value());
}

void begin_simulation(std::shared_ptr<simulator> simulator) {
    simulator->machine->begin_simulation();
}

void end_simulation(std::shared_ptr<simulator> simulator) {
    simulator->machine->end_simulation();
}

EMSCRIPTEN_BINDINGS(pep10) {

    emscripten::function("errorName", &error_name);
    emscripten::enum_<element_type>("ElementType")
        .value("C", element_type::kC)
        .value("Pep", element_type::kPep)
        .value("Pepl", element_type::kPepl)
        .value("Pepo", element_type::kPepo)
        .value("Peph", element_type::kPeph)
        .value("Pepb", element_type::kPepb)
        .value("Pepm", element_type::kPepm);
    emscripten::register_map<element_type, std::string>("FigureElement");

    // Needed for figure, ls-figures.
    emscripten::class_<figure>("Figure")
        .property("processor", &figure::proc)
        .property("chapter", &figure::chapter)
        .property("figure", &figure::fig)
        .property("elements", &figure::elements);
    emscripten::class_<std::vector<figure>>("FigureVector")
        .constructor()
        .function("size", emscripten::select_overload<size_t(void) const>(&std::vector<figure>::size))
        .function("get", emscripten::select_overload<const figure&(size_t)const>(&std::vector<figure>::at));
    // Needed for macro, ls-macros.
    emscripten::class_<macro>("Macro")
        .property("name", &macro::name)
        .property("text", &macro::text);
    emscripten::class_<std::vector<macro>>("MacroVector")
        .constructor()
        .function("size", emscripten::select_overload<size_t(void) const>(&std::vector<macro>::size))
        .function("get", emscripten::select_overload<const macro&(size_t)const>(&std::vector<macro>::at));
    // Registry for macro/figure commands.
    emscripten::class_<registry>("Registry")
        .constructor(&registry::instance)
        .function("findMacro", get_macro)
        .function("findFigure", get_figure)
        .function("figures", &registry::figures)
        .function("macros", &registry::macros);

    // Wrappers for program assembly
    emscripten::enum_<masm::message_type>("MessageLevel")
        .value("Status", masm::message_type::kStatus)
        .value("Warning", masm::message_type::kWarning)
        .value("Error", masm::message_type::kError);
    emscripten::function("maxSeverity", &max_severity);
    emscripten::value_object<local_message>("ErrorMessage")
        .field("line", &local_message::line)
        .field("message", &local_message::message)
        .field("type", &local_message::level);
    emscripten::enum_<assemble_error_code>("AssemblyErrorCode")
        .value("Complete", assemble_error_code::kComplete)
        .value("SourceMustBeText", assemble_error_code::kSourceMustBeText)
        .value("UnableToLookupOS", assemble_error_code::kUnableToLookupOS);
    emscripten::class_<std::shared_ptr<project>>("AssemblyProject")
        .constructor(&init_project)
        .function("registerUserMacro", &register_user_macro)
        .function("setUserProgram", &set_user_program)
        .function("setOS", &set_os)
        .function("assemble", &assemble)
        .function("errors", &errors)
        .function("formattedObjectCode", &object_bytes)
        .function("formattedUserListing", &user_listing)
        .function("formattedOSListing", &os_listing)
        .function("rawBytesELF", &elf_bytes)
        .function("loadableImage", &loadable_image);
    
    // Needed for `run`
    emscripten::class_<std::shared_ptr<masm::elf::AnnotatedImage<uint16_t>>>("LoadableMachineImage");
    emscripten::function("objectCodeToImage", object_code_to_image);
    emscripten::function("rawBytesToImage", elf_bytes_to_image, emscripten::allow_raw_pointers());
    emscripten::enum_<step::Result>("StepResult")
        .value("Halted", step::Result::kHalted)
        .value("Breakpoint", step::Result::kBreakpoint)
        .value("NeedsMMI", step::Result::kNeedsMMI)
        .value("Nominal", step::Result::kNominal)
        .value("Errored", step::Result::kErrored);
    emscripten::class_<std::shared_ptr<simulator>>("Pep10Simulator")
        .constructor(make_simulator)
        .function("setImage", &set_program_image)
        .function("setMaxSteps", &set_max_steps)
        .function("setCharIn", &set_charIn)
        .function("getCharOut", &get_charOut)
        .function("run", &run)
        .function("beginSimulation", &begin_simulation)
        .function("endSimulation", &end_simulation);

}