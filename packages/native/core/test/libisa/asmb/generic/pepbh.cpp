#include "catch.hpp"

#include "asmb/pep10/create_driver.hpp"
#include "asmb/pep10/ir.hpp"
#include "ex_registry.hpp"
#include "masm/ir/directives.hpp"
#include "masm/ir/empty.hpp"
#include "masm/project/init_project.hpp"
#include "masm/project/project.hpp"
#include "masm/utils/listing.hpp"

TEST_CASE("Convert to pepb") {
    using namespace asmb::pep10::driver;
    auto driver = make_driver();
    auto ex = registry::instance();
    auto fig_os = ex.find("pep10", 9, "00").value();
    auto text_os = fig_os.elements.at(element_type::kPep);
    auto file_os = std::make_shared<masm::project::source_file>();
    file_os->name = "os";
    file_os->body = text_os;

    SECTION("No .END") {
        auto project = masm::project::init_project<uint16_t>();
        for (const auto &macro : ex.macros()) {
            CHECK(project->macro_registry->register_macro(macro.name, macro.text, masm::MacroType::CoreMacro));
        }
        auto file_user = std::make_shared<masm::project::source_file>();
        file_user->name = "user";
        file_user->body = "ADDA 0xdead,i\nNOTX;comment here\n.END\n";
        auto res = driver->assemble_joint(project, file_os, file_user, masm::project::toolchain_stage::FINISHED);
        REQUIRE(res.first);
        std::string formatted = ::masm::utils::generate_pretty_object_code(project->image->user, 2);
        CHECK(formatted == "0000 1010 0000 1101 1110 1010 1101\n0003 0001 0001                ;comment here\n");
    }
}

TEST_CASE("Convert to peph") {
    using namespace asmb::pep10::driver;
    auto driver = make_driver();
    auto ex = registry::instance();
    auto fig_os = ex.find("pep10", 9, "00").value();
    auto text_os = fig_os.elements.at(element_type::kPep);
    auto file_os = std::make_shared<masm::project::source_file>();
    file_os->name = "os";
    file_os->body = text_os;
    SECTION("Add a single macro") {
        auto project = masm::project::init_project<uint16_t>();
        for (const auto &macro : ex.macros()) {
            CHECK(project->macro_registry->register_macro(macro.name, macro.text, masm::MacroType::CoreMacro));
        }
        auto file_user = std::make_shared<masm::project::source_file>();
        file_user->name = "user";
        file_user->body = "ADDA 0xdead,i\nNOTX;comment here\n.END\n";
        auto res = driver->assemble_joint(project, file_os, file_user, masm::project::toolchain_stage::FINISHED);
        REQUIRE(res.first);
        std::string formatted = ::masm::utils::generate_pretty_object_code(project->image->user, 16);
        CHECK(formatted == "0000 A0DEAD\n0003 11     ;comment here\n");
    }
}
