#include <bit>
#include <cstdint>

#include <catch.hpp>
#include <fmt/core.h>

#include "components/storage/base.hpp"
#include "components/storage/block.hpp"
#include "isa/pep10/local_machine.hpp"
#include "isa/pep10/local_processor.hpp"
#include "isa/pep10/pep10.hpp"


TEST_CASE("Instruction: ASRX", "[isa::pep10]")
{
	auto storage = std::make_shared<components::storage::Block<uint16_t, true, uint8_t>>(0xFFFF);
	auto machine = std::make_shared<isa::pep10::LocalMachine<true>>(storage);
	// Object code for instruction under test.
	std::vector<uint8_t> program = {0x17};
	// RTL: C ← X[15] , X[1 : 15] ← X[0 : 14] ; N ← X < 0 , Z ← X = 0
	SECTION("ASRX")
	{
		// Loop over non-target status bit combinations to ensure that the instruction does not modify non-target bits.
		for(uint8_t v = 0; static_cast<uint8_t>(v)+1<0b10; v++)
		{
			for(uint16_t X=0; static_cast<uint32_t>(X)+1<0x1'0000;X++)
			{
				machine->clear_all(0, 0, false);
				machine->write_register(isa::pep10::Register::X, X);
				isa::pep10::load_bytes(machine, program, 0).value();



				auto ret = machine->step();
				REQUIRE(ret.has_value());
				CHECK(ret.value() == step::Result::kNominal);

				// Check that other registers were not mutated.
				CHECK(machine->read_register(isa::pep10::Register::SP) == 0);
				CHECK(machine->read_register(isa::pep10::Register::A) == 0);
				CHECK(machine->read_register(isa::pep10::Register::OS) == 0);
				CHECK(machine->read_register(isa::pep10::Register::TR) == 0);
				// PC was incremented by one byte
				CHECK(machine->read_register(isa::pep10::Register::PC) == 0x01);
				// IS has the correct instruction mnemonic
				CHECK(machine->read_register(isa::pep10::Register::IS) == 0x17);
				auto new_X = machine->read_register(isa::pep10::Register::X);
				// X is the starting X, shifted right by 1 bit.
				// Since using unsigned shift, must manually set high order position to 1 if necessary.
				CHECK(new_X == (((X & 0x8000) ? 1<<15 : 0) | static_cast<uint16_t>(X>>1)));
				CHECK(machine->read_csr(isa::pep10::CSR::N) == ((new_X & 0x8000) ? 1 : 0));
				CHECK(machine->read_csr(isa::pep10::CSR::Z) == ((new_X == 0) ? 1 : 0));
				// Carry out if low order bit was non-zero.
				CHECK(machine->read_csr(isa::pep10::CSR::C) == ((X & 0x1) ? 1 : 0));
			}
		}
	}


}
