#include "catch.hpp"
#include "helper.hpp"

#include "asmb/pep10/ir.hpp"
#include "masm/ir/directives.hpp"

TEST_CASE( "Parse dot BYTE", "[asmb::pep10::parser]"  ) {

	auto driver = make_driver();

	SECTION("decimal .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE 33\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 1);
		auto maybe_byte = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_byte = std::dynamic_pointer_cast<masm::ir::dot_byte<uint16_t> >(maybe_byte);
		REQUIRE(as_byte->argument->value() == 33);
	}
	
	SECTION("signed decimal .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE -33\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 1);
		auto maybe_byte = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_byte = std::dynamic_pointer_cast<masm::ir::dot_byte<uint16_t> >(maybe_byte);
		REQUIRE(as_byte->argument->value() == static_cast<uint16_t>(-33));
	}

	SECTION("no symbolic .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = "s:.EQUATE 33\n.BYTE s\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(!res.first);
	}

	SECTION("hex .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE 0x21\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 1);
		auto maybe_byte = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_byte = std::dynamic_pointer_cast<masm::ir::dot_byte<uint16_t> >(maybe_byte);
		REQUIRE(as_byte->argument->value() == 33);
	}

	SECTION("char .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE '!'\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 1);
		auto maybe_byte = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_byte = std::dynamic_pointer_cast<masm::ir::dot_byte<uint16_t> >(maybe_byte);
		REQUIRE(as_byte->argument->value() == 33);
	}

	SECTION("string .BYTE") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE \"!\"\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE(res.first);
		auto x = project->images[0]->sections[0];
		REQUIRE(project->images[0]->sections[0]->body_ir->ir_lines.size() == 1);
		auto maybe_byte = project->images[0]->sections[0]->body_ir->ir_lines[0];
		auto as_byte = std::dynamic_pointer_cast<masm::ir::dot_byte<uint16_t> >(maybe_byte);
		REQUIRE(as_byte->argument->value() == 33);
	}

	SECTION("No 3 byte argument") {	
		auto project = masm::project::init_project<uint16_t>();
		auto file = std::make_shared<masm::project::source_file>();
		file->name = "main";
		file->body = ".BYTE \"!!!\"\n";
		std::vector<driver_t::source_t> vec = {file};
		auto res = driver->assemble_project(project, vec, masm::project::toolchain_stage::SYMANTIC);
		REQUIRE_FALSE(res.first);
	}
}