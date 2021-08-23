#include "catch.hpp"
#include <elfio/elfio.hpp>

#include "asmb/pep10/ir.hpp"
#include "asmb/pep10/create_driver.hpp"
#include "elf_tools/pep10/mem_map.hpp"
#include "ex_registry.hpp"
#include "masm/ir/directives.hpp"
#include "masm/ir/macro.hpp"

std::shared_ptr<ELFIO::elfio> os_to_image()
{
	using namespace asmb::pep10::driver;
	auto driver = make_driver();
	auto project = masm::project::init_project<uint16_t>();
	auto ex = registry::instance();
	for(const auto& macro : ex.macros()){
		CHECK(project->macro_registry->register_macro(macro.name, macro.text, masm::MacroType::CoreMacro));
	}
	auto fig_os = ex.find("pep10", 9, "00").value();
	auto text_os = fig_os.elements.at(element_type::kPep);
	auto file_os = std::make_shared<masm::project::source_file>();
	file_os->name = "os";
	file_os->body = text_os;
	auto res = driver->assemble_os(project, file_os, masm::project::toolchain_stage::FINISHED);
	std::cout << res.second;
	REQUIRE(res.first);
	REQUIRE(project->as_elf);
	return project->as_elf;
	
}
TEST_CASE( "Convert ELF image to Pep/10 machine", "[elf_tools::pep10]"  ) {


	SECTION("Assemble OS successfully.") {	
		REQUIRE(os_to_image() != nullptr);
	}

	SECTION("ROM in correct location and is correct size.") {	
		auto image = os_to_image();
		auto ROM_result = elf_tools::pep10::construct_os_storage<false>(*image);
		REQUIRE(ROM_result.has_value());
		auto [ROM_offset, ROM_storage] = ROM_result.value();
		// OS ROM should not unexpectedly change in size.
		CHECK(ROM_offset == 0xFAAF);
		CHECK(ROM_storage->max_offset() == 0x550);
		// And the default OS should go right up to the maximum offset.
		CHECK(ROM_offset + ROM_storage->max_offset() == 0xFFFF);
	}

	SECTION("RAM in correct location and is correct size.") {	
		auto image = os_to_image();
		auto RAM_result = elf_tools::pep10::construct_ram<false>(*image);
		REQUIRE(RAM_result.has_value());
		auto [RAM_offset, RAM_storage] = RAM_result.value();
		// RAM should not unexpectedly change in size or location.
		CHECK(RAM_offset == 0x0000);
		CHECK(RAM_storage->max_offset() == 0xFAAE);
	}

	SECTION("MMIO definitions are correct.") {	
		auto image = os_to_image();
		auto ports_result = elf_tools::pep10::port_definitions(*image);
		REQUIRE(ports_result.has_value());
		auto ports = ports_result.value();

		// Pep/10 should have 4 MMIO ports with the given address/type properties.
		CHECK(ports.size() == 4);
		for(auto& port : ports) {
			if(port.name == "charIn") {
				CHECK(port.type == masm::elf::mmio::Type::kInput);
				CHECK(port.offset == 0xFAAC);
			} else if(port.name == "charOut") {
				CHECK(port.type == masm::elf::mmio::Type::kOutput);
				CHECK(port.offset == 0xFAAD);
			} else if(port.name == "diskIn") {
				CHECK(port.type == masm::elf::mmio::Type::kInput);
				CHECK(port.offset == 0xFAAB);
			} else if(port.name == "pwrOff") {
				CHECK(port.type == masm::elf::mmio::Type::kOutput);
				CHECK(port.offset == 0xFAAE);
			} else {
				CHECK((false && "Bad MMIO definition"));
			}
		}
	}

	SECTION("MMIO ports in correct location and is correct count.") {	
		auto image = os_to_image();
		auto ports_result = elf_tools::pep10::construct_mmio_ports<false>(*image);
		REQUIRE(ports_result.has_value());
		auto ports = ports_result.value();

		// Pep/10 should have 4 MMIO ports with the given address/type properties.
		CHECK(ports.size() == 4);
		for(auto& [offset, storage] : ports) {
			if(offset == 0xFAAC) { //charIn
				auto ptr = std::dynamic_pointer_cast<components::storage::Input<uint16_t, false, uint8_t>>(storage);
				CHECK(ptr != nullptr);
			} else if(offset == 0xFAAD) { // charOut
				auto ptr = std::dynamic_pointer_cast<components::storage::Output<uint16_t, false, uint8_t>>(storage);
				CHECK(ptr != nullptr);
			} else if(offset == 0xFAAB) { //diskIn
				auto ptr = std::dynamic_pointer_cast<components::storage::Input<uint16_t, false, uint8_t>>(storage);
				CHECK(ptr != nullptr);
			} else if(offset == 0xFAAE) { //pwrOff
				auto ptr = std::dynamic_pointer_cast<components::storage::Output<uint16_t, false, uint8_t>>(storage);
				CHECK(ptr != nullptr);
			} else {
				CHECK((false && "Not a valid MMIO port."));
			}
		}
	}
}