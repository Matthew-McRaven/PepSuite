#include "catch.hpp"

#include "asmb/pep10/create_driver.hpp"
#include "asmb/pep10/directives.hpp"
#include "asmb/pep10/ir.hpp"
#include "masm/ir/directives.hpp"

TEST_CASE("Parse dot SCALL", "[asmb::pep10::parser]") {
    using namespace asmb::pep10::driver;
    auto driver = make_driver();

    SECTION("Valid .SCALL") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = "s:asra\n.SCALL s\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE(res.first);
        auto x = project->image->os;
        REQUIRE(project->image->os->body_ir->ir_lines.size() == 2);
        auto maybe_SCALL = project->image->os->body_ir->ir_lines[1];
        auto as_SCALL = std::dynamic_pointer_cast<asmb::pep10::dot_scall<uint16_t>>(maybe_SCALL);
        REQUIRE(as_SCALL);

        // Check for externalized symbol definition.
        // REQUIRE(project->image->symbol_table->exists("s"));
        REQUIRE(symbol::exists<uint16_t>({project->image->symbol_table}, "s"));
        REQUIRE(project->macro_registry->contains("s"));
    }

    SECTION("Valid .SCALL + comment") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".SCALL s ;Hi guys\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE(res.first);
        auto x = project->image->os;
        REQUIRE(project->image->os->body_ir->ir_lines.size() == 1);
        auto maybe_SCALL = project->image->os->body_ir->ir_lines[0];
        auto as_SCALL = std::dynamic_pointer_cast<asmb::pep10::dot_scall<uint16_t>>(maybe_SCALL);
        REQUIRE(as_SCALL);
        REQUIRE(as_SCALL->comment);
        CHECK(as_SCALL->comment.value() == "Hi guys");

        // Check for externalized symbol definition.
        // REQUIRE(project->image->symbol_table->exists("s"));
        REQUIRE(symbol::exists<uint16_t>({project->image->symbol_table}, "s"));
        REQUIRE(project->macro_registry->contains("s"));
    }

    SECTION("Invalid .SCALL + symbol + comment") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        // TODO: Ban self-references on.SCALL, since.SCALL generates no object code.
        file->body = "s: .SCALL s ;Hi guys\n"; // Self reference is actually okay here, but has no use.
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }

    SECTION("No dec in .SCALL") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".SCALL 22\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }

    SECTION("No hex in .SCALL") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".SCALL 0xbeef\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
    SECTION("No signed dec in .SCALL") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".SCALL -19\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
    SECTION("No string in .SCALL") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".SCALL \"HI\"\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
}