#include "pep9.hpp"

#include <emscripten.h>
#include <iostream>

pep9::wrapped_isa_definition::wrapped_isa_definition() {}

EMSCRIPTEN_BINDINGS(pep9) {

    auto im = emscripten::enum_<isa::pep9::instruction_mnemonic>("InstructionMnemonic");
    for (auto [enu, str] : magic_enum::enum_entries<isa::pep9::instruction_mnemonic>()) {
        im.value(str.data(), enu);
    }

    auto am = emscripten::enum_<isa::pep9::addressing_mode>("AddressingMode");
    for (auto [enu, str] : magic_enum::enum_entries<isa::pep9::addressing_mode>()) {
        am.value(str.data(), enu);
    }

    auto ac = emscripten::enum_<isa::pep9::addressing_class>("AddressingClass");
    for (auto [enu, str] : magic_enum::enum_entries<isa::pep9::addressing_class>()) {
        ac.value(str.data(), enu);
    }

    auto arr = emscripten::value_array<std::array<bool, magic_enum::enum_count<isa::pep9::CSR>()>>("CSRModified");
    loop<decltype(arr), magic_enum::enum_count<isa::pep9::CSR>() - 1>().fn(arr);

    auto csr = emscripten::enum_<isa::pep9::CSR>("CSR");
    for (auto [enu, str] : magic_enum::enum_entries<isa::pep9::CSR>()) {
        csr.value(str.data(), enu);
    }

    emscripten::value_object<isa::pep9::instruction_definition>("InstructionDefinition")
        .field("bit_pattern", &isa::pep9::instruction_definition::bit_pattern)
        .field("iformat", &isa::pep9::instruction_definition::iformat)
        .field("csr_modified", &isa::pep9::instruction_definition::CSR_modified)
        .field("mnemonic", &isa::pep9::instruction_definition::mnemonic)
        .field("is_unary", &isa::pep9::instruction_definition::is_unary)
        .field("comment", &isa::pep9::instruction_definition::comment);

    emscripten::register_map<isa::pep9::instruction_mnemonic, std::shared_ptr<isa::pep9::instruction_definition>>(
        "ISAMap");

    emscripten::class_<isa::pep9::addr_map>("amap");

    using instr_def_t = isa::pep9::instruction_definition;
    emscripten::class_<std::shared_ptr<instr_def_t>>("Smarty")
        // Must manually tell each property what it's type is, because it can't infer it from
        // the getter. Failing to specify property type will cause it to explode.
        .property<decltype(instr_def_t::bit_pattern)>("bit_pattern", &bit_pattern<instr_def_t>)
        .property<decltype(instr_def_t::iformat)>("iformat", &iformat<instr_def_t>)
        .property<decltype(instr_def_t::CSR_modified)>("CSR_modified", &CSR_modified<instr_def_t>)
        .property<decltype(instr_def_t::mnemonic)>("mnemonic", &mnemonic<instr_def_t>)
        .property<decltype(instr_def_t::is_unary)>("is_unary", &is_unary<instr_def_t>);

    auto oe = emscripten::value_array<std::array<isa::pep9::addr_map, 255>>("OderEyes");
    loop<decltype(oe), 255>().fn(oe);
    emscripten::class_<pep9::wrapped_isa_definition>("IsaDefinition")
        .constructor()
        .property("isa", &pep9::wrapped_isa_definition::get_isa)
        .property("map", &pep9::wrapped_isa_definition::get_map);
}