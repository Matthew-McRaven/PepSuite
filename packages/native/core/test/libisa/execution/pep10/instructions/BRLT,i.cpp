#include <bit>
#include <cstdint>

#include <catch.hpp>
#include <fmt/core.h>

#include "components/storage/base.hpp"
#include "components/storage/block.hpp"
#include "isa/pep10/local_machine.hpp"
#include "isa/pep10/local_processor.hpp"
#include "isa/pep10/pep10.hpp"


TEST_CASE("Instruction: BRLT,i", "[isa::pep10]")
{
	auto storage = std::make_shared<components::storage::Block<uint16_t, true, uint8_t>>(0xFFFF);
	auto machine = std::make_shared<isa::pep10::LocalMachine<true>>(storage);
	
	// RTL: N = 1 ⇒ PC ← Oprnd
	SECTION("BRLT, i")
	{
		// Loop over non-target status bit combinations to ensure that the instruction does not modify non-target bits.
		for(uint8_t start_stat = 0; static_cast<uint8_t>(start_stat)+1<0b1'0000; start_stat++)
		{
			for(uint16_t opspec=0; static_cast<uint32_t>(opspec)+1<0x1'0000;opspec++)
			{
				// Object code for instruction under test.
				std::vector<uint8_t> program = {0x20, static_cast<uint8_t>((opspec>>8)&0xff), 
					static_cast<uint8_t>(opspec&0xff)};
				machine->clear_all(0, 0, false);
				// Set the starting status bits so that we can check that they are not mutated by this instruction.
				machine->write_packed_csr(start_stat);
				isa::pep10::load_bytes(machine, program, 0).value();


				auto ret = machine->step();
				REQUIRE(ret.has_value());
				CHECK(ret.value());

				// Check that other registers were not mutated.
				CHECK(machine->read_register(isa::pep10::Register::SP) == 0);
				CHECK(machine->read_register(isa::pep10::Register::X) == 0);
				CHECK(machine->read_register(isa::pep10::Register::A) == 0);
				CHECK(machine->read_register(isa::pep10::Register::TR) == 0);
				// Status bits did not change.
				CHECK(machine->read_packed_csr() == start_stat);
				// PC takes on the value of the operand if status bits are correct. Else, it is unchanged.
				if(machine->read_csr(isa::pep10::CSR::N)) {
					CHECK(machine->read_register(isa::pep10::Register::PC) == opspec);
				} else {
					CHECK(machine->read_register(isa::pep10::Register::PC) == 0x03);
				}
				// IS has the correct instruction mnemonic
				CHECK(machine->read_register(isa::pep10::Register::IS) == 0x20);
				// OS loaded the Mem[0x0001-0x0002].
				CHECK(machine->read_register(isa::pep10::Register::OS) == opspec);
			}
		}
	}


}
