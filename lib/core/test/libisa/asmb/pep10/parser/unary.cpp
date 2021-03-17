#include "catch.hpp"
#include "helper.hpp"

#include "asmb/pep10/ir.hpp"
#include "masm/ir/directives.hpp"

TEST_CASE( "Parse unary instructions", "[asmb::pep10::parser]"  ) {

	auto driver = make_driver();

	SECTION("Unary instruction.") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = "ASRA\n.END\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 2);
		auto maybe_unary = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_unary = std::dynamic_pointer_cast<asmb::pep10::unary_instruction>(maybe_unary);
		REQUIRE(as_unary);
		CHECK(as_unary->mnemonic == isa::pep10::instruction_mnemonic::ASRA);
		CHECK(!as_unary->comment);
	}

	SECTION("Unary instruction with symbol.") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = "maybe: ASRA\n.END\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 2);
		auto maybe_unary = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_unary = std::dynamic_pointer_cast<asmb::pep10::unary_instruction>(maybe_unary);
		REQUIRE(as_unary);
		CHECK(as_unary->mnemonic == isa::pep10::instruction_mnemonic::ASRA);
		CHECK(!as_unary->comment);
		REQUIRE(as_unary->symbol_entry);
		CHECK(as_unary->symbol_entry->name == "maybe");
	}

	SECTION("Unary instruction with symbol + comment.") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = "maybe: ASRA;A comment\n.END\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 2);
		auto maybe_unary = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_unary = std::dynamic_pointer_cast<asmb::pep10::unary_instruction>(maybe_unary);
		REQUIRE(as_unary);
		CHECK(as_unary->mnemonic == isa::pep10::instruction_mnemonic::ASRA);
		REQUIRE(as_unary->comment);
		CHECK(as_unary->comment.value() == "A comment");
		REQUIRE(as_unary->symbol_entry);
		CHECK(as_unary->symbol_entry->name  == "maybe");
	}

	SECTION("Unary instruction with comment.") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = "ASRA ;Hello\n.END\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 2);
		auto maybe_unary = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_unary = std::dynamic_pointer_cast<asmb::pep10::unary_instruction>(maybe_unary);
		REQUIRE(as_unary);
		CHECK(as_unary->mnemonic == isa::pep10::instruction_mnemonic::ASRA);
		REQUIRE(as_unary->comment);
		CHECK(as_unary->comment.value() == "Hello");
		REQUIRE(!as_unary->symbol_entry);
	}
}