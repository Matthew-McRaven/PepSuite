#include "catch.hpp"

#include "asmb/pep10/create_driver.hpp"
#include "asmb/pep10/ir.hpp"
#include "masm/ir/directives.hpp"

TEST_CASE("Parse dot align", "[asmb::pep10::parser]") {
    using namespace asmb::pep10::driver;
    auto driver = make_driver();

    SECTION("Valid .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN 8\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE(res.first);
        auto x = project->image->os;
        REQUIRE(project->image->os->body_ir->ir_lines.size() == 1);
        auto maybe_ascii = project->image->os->body_ir->ir_lines[0];
        auto as_ascii = std::dynamic_pointer_cast<masm::ir::dot_align<uint16_t>>(maybe_ascii);
        REQUIRE(as_ascii);
    }

    SECTION("Valid .ALIGN + comment") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN 2 ;Hi guys\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE(res.first);
        auto x = project->image->os;
        REQUIRE(project->image->os->body_ir->ir_lines.size() == 1);
        auto maybe_ascii = project->image->os->body_ir->ir_lines[0];
        auto as_ascii = std::dynamic_pointer_cast<masm::ir::dot_align<uint16_t>>(maybe_ascii);
        REQUIRE(as_ascii);
        REQUIRE(as_ascii->comment);
        CHECK(as_ascii->comment.value() == "Hi guys");
    }

    SECTION("Valid .ALIGN + symbol + comment") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = "s: .ALIGN 4 ;Hi guys\n"; // Self reference is actually okay here, but has no use.
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE(res.first);
        auto x = project->image->os;
        REQUIRE(project->image->os->body_ir->ir_lines.size() == 1);
        auto maybe_ascii = project->image->os->body_ir->ir_lines[0];
        auto as_ascii = std::dynamic_pointer_cast<masm::ir::dot_align<uint16_t>>(maybe_ascii);
        REQUIRE(as_ascii);
        REQUIRE(as_ascii->comment);
        REQUIRE(as_ascii->symbol_entry);
        CHECK(as_ascii->symbol_entry->name == "s");
    }

    SECTION("Non-power-of-2 dec in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN 7\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }

    SECTION("Non-power-of-2 hex in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN 0xbeef\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
    SECTION("No negative dec in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN -19\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
    SECTION("No identifer in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN HI\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
    SECTION("No char in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN 'HI'\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }

    SECTION("No string in .ALIGN") {
        auto project = masm::project::init_project<uint16_t>();
        auto file = std::make_shared<masm::project::source_file>();
        file->name = "main";
        file->body = ".ALIGN \"HI\"\n";
        auto res = driver->assemble_os(project, file, masm::project::toolchain_stage::SYMANTIC);
        REQUIRE_FALSE(res.first);
    }
}