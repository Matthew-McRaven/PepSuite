#include "isa/pep9/instruction.hpp"

#include <iostream>
#include <algorithm>
namespace isa::pep9{
const std::array<instruction_definition<uint8_t>, (int) instruction_mnemonic::MAX> init_isa() {
	return {{
		{0x00, addressing_class::U_none,   {{false,false,false,false,}}, instruction_mnemonic::STOP, true, ""},
		{0x01, addressing_class::U_none,   {{false,false,false,false,}}, instruction_mnemonic::RET, true, ""},
		{0x02, addressing_class::U_none,   {{false,false,false,false,}}, instruction_mnemonic::RETTR, true, ""},
		{0x03, addressing_class::U_none,   {{false,false,false,false,}}, instruction_mnemonic::MOVSPA, true,""},
		{0x04, addressing_class::U_none,   {{false,false,false,false,}}, instruction_mnemonic::MOVFLGA, true,""},
		{0x05, addressing_class::U_none,   {{ true, true, true, true,}},  instruction_mnemonic::MOVAFLG, true,""},

		
		{0x06, addressing_class::R_none, {{ true, true,false,false}}, instruction_mnemonic::NOTA, true, ""},
		{0x07, addressing_class::R_none, {{ true, true,false,false}}, instruction_mnemonic::NOTX, true, ""},
		{0x08, addressing_class::R_none, {{ true, true, true,false}}, instruction_mnemonic::NEGA, true, ""},
		{0x09, addressing_class::R_none, {{ true, true, true,false}}, instruction_mnemonic::NEGX, true, ""},
		{0x0a, addressing_class::R_none, {{ true, true, true, true}}, instruction_mnemonic::ASLA, true, ""},
		{0x0b, addressing_class::R_none, {{ true, true, true, true}}, instruction_mnemonic::ASLX, true, ""},
		{0x0c, addressing_class::R_none, {{ true, true,false, true}}, instruction_mnemonic::ASRA, true, ""},
		{0x0d, addressing_class::R_none, {{ true, true,false, true}}, instruction_mnemonic::ASRX, true, ""},
		{0x0e, addressing_class::R_none, {{false,false,false, true}}, instruction_mnemonic::ROLA, true, ""},
		{0x0f, addressing_class::R_none, {{false,false,false, true}}, instruction_mnemonic::ROLX, true, ""},
		{0x10, addressing_class::R_none, {{false,false,false, true}}, instruction_mnemonic::RORA, true, ""},
		{0x11, addressing_class::R_none, {{false,false,false, true}}, instruction_mnemonic::RORX, true, ""},

		{0x12, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BR, false, ""},
		{0x14, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRLE, false, ""},
		{0x16, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRLT, false, ""},
		{0x18, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BREQ, false, ""},
		{0x1A, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRNE, false, ""},
		{0x1C, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRGE, false, ""},
		{0x1E, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRGT, false, ""},
		{0x20, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRV, false, ""},
		{0x22, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::BRC, false, ""},
		{0x24, addressing_class::A_ix, {{false,false,false,false,}}, instruction_mnemonic::CALL, false, ""},

		{0x26, addressing_class::U_none, {{false,false,false,false,}}, instruction_mnemonic::NOP0, true, ""},
		{0x27, addressing_class::U_none, {{false,false,false,false,}}, instruction_mnemonic::NOP1, true, ""},

		{0x28, addressing_class::AAA_all, {{false,false,false,false,}}, instruction_mnemonic::NOP, true, ""},
		{0x30, addressing_class::AAA_all, {{ true, true, true,false,}}, instruction_mnemonic::DECI, true, ""},
		{0x38, addressing_class::AAA_all, {{false,false,false,false,}}, instruction_mnemonic::DECO, true, ""},
		{0x40, addressing_class::AAA_all, {{false,false,false,false,}}, instruction_mnemonic::HEXO, true, ""},
		{0x48, addressing_class::AAA_all, {{false,false,false,false,}}, instruction_mnemonic::STRO, true, ""},

		{0x50, addressing_class::AAA_all, {{ true, true, true, true}}, instruction_mnemonic::ADDSP, false, ""},
		{0x58, addressing_class::AAA_all, {{ true, true, true, true}}, instruction_mnemonic::SUBSP, false, ""},

		{0x60, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::ADDA, false, ""},
		{0x68, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::ADDX, false, ""},
		{0x70, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::SUBA, false, ""},
		{0x78, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::SUBX, false, ""},
		{0x80, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::ANDA, false, ""},
		{0x88, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::ANDX, false, ""},
		{0x90, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::ORA, false, ""},
		{0x98, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::ORX, false, ""},

		{0xa0, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::CPWA, false, ""},
		{0xa8, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::CPWX, false, ""},
		{0xb0, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::CPBA, false, ""},
		{0xb8, addressing_class::RAAA_all, {{ true, true, true, true,}}, instruction_mnemonic::CPBX, false, ""},

		{0xc0, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::LDWA, false, ""},
		{0xc8, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::LDWX, false, ""},
		{0xd0, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::LDBA, false, ""},
		{0xd8, addressing_class::RAAA_all, {{ true, true,false,false,}}, instruction_mnemonic::LDBX, false, ""},

		{0xe0, addressing_class::RAAA_noi, {{false,false,false,false,}}, instruction_mnemonic::STWA, false, ""},
		{0xe8, addressing_class::RAAA_noi, {{false,false,false,false,}}, instruction_mnemonic::STWX, false, ""},
		{0xf0, addressing_class::RAAA_noi, {{false,false,false,false,}}, instruction_mnemonic::STBA, false, ""},
		{0xf8, addressing_class::RAAA_noi, {{false,false,false,false,}}, instruction_mnemonic::STBX, false, ""},
	}};
}

static const std::array<instruction_definition<uint8_t>, (int) instruction_mnemonic::MAX> isa_map = init_isa();

std::array<std::tuple<const instruction_definition<uint8_t>*, addressing_mode>,256> init_mmap() {
	using instr = instruction_definition<uint8_t>;
	std::array<std::tuple<const instr*, addressing_mode>,256> riproll = {};
	for(int it=0; it<256; it++) {
			auto ub = std::upper_bound(isa_map.cbegin(), isa_map.cend(), it, [](int v, const instr &ref){return v < ref.bit_pattern ;});

			// First element is >, so none are <=
			if(ub == isa_map.cbegin()) {
				throw std::invalid_argument("Invalid Instruction.");
			}
			auto lb = ub - 1;


			addressing_mode mode = addressing_mode::INVALID;

			switch (lb->iformat) {
			case addressing_class::R_none:
				[[fallthrough]]; 
			case addressing_class::U_none: 
				mode = addressing_mode::NONE;
				break;
			case addressing_class::A_ix:
				if (it-lb->bit_pattern == 0) mode = addressing_mode::I;
				else if (it-lb->bit_pattern == 1) mode = addressing_mode::X;
				else throw std::invalid_argument("Invalid A addressing mode.");
				break;
			case addressing_class::AAA_i:
				if (it-lb->bit_pattern == 0) mode = addressing_mode::I;
				else if (it-lb->bit_pattern <= 7) mode = addressing_mode::INVALID;
				else throw std::invalid_argument("Invalid AAA_i addressing mode.");
				break;
			case addressing_class::AAA_all:
				[[fallthrough]];
			case addressing_class::RAAA_all:
				if (it-lb->bit_pattern == 0) mode = addressing_mode::I;
				else if (it-lb->bit_pattern == 1) mode = addressing_mode::D;
				else if (it-lb->bit_pattern == 2) mode = addressing_mode::N;
				else if (it-lb->bit_pattern == 3) mode = addressing_mode::S;
				else if (it-lb->bit_pattern == 4) mode = addressing_mode::SF;
				else if (it-lb->bit_pattern == 5) mode = addressing_mode::X;
				else if (it-lb->bit_pattern == 6) mode = addressing_mode::SX;
				else if (it-lb->bit_pattern == 7) mode = addressing_mode::SFX;
				else throw std::invalid_argument("Invalid RAAA addressing mode.");
				break;
			case addressing_class::RAAA_noi:
				if (it-lb->bit_pattern == 0) mode = addressing_mode::INVALID;
				else if (it-lb->bit_pattern == 1) mode = addressing_mode::D;
				else if (it-lb->bit_pattern == 2) mode = addressing_mode::N;
				else if (it-lb->bit_pattern == 3) mode = addressing_mode::S;
				else if (it-lb->bit_pattern == 4) mode = addressing_mode::SF;
				else if (it-lb->bit_pattern == 5) mode = addressing_mode::X;
				else if (it-lb->bit_pattern == 6) mode = addressing_mode::SX;
				else if (it-lb->bit_pattern == 7) mode = addressing_mode::SFX;
				else throw std::invalid_argument("Invalid AAA addressing mode.");
				break;
			}
			riproll[it] = {lb, mode};
			
	}
	return riproll;
}

isa_definition::isa_definition():
	isa(isa::pep9::isa_map), riproll(init_mmap())
{

}


std::string as_string(instruction_mnemonic mnemon) {
	if (mnemon == instruction_mnemonic::MAX) {
		throw std::invalid_argument("Not a real mnemonic");
	}
	return std::string(magic_enum::enum_name(mnemon));
}

bool is_opcode_unary(instruction_mnemonic mnemon)
{
	auto addr_class = isa::pep9::definition.isa[(int) mnemon].iformat;
	switch (addr_class)
	{
	case addressing_class::A_ix:
	case addressing_class::AAA_all:
	case addressing_class::AAA_i:
	case addressing_class::RAAA_all:
	case addressing_class::RAAA_noi:
		return true;
	case addressing_class::U_none:
	case addressing_class::R_none:
		return false;
	}
	throw std::invalid_argument("Invalid opcode.");
}

bool is_opcode_unary(uint8_t opcode)
{
	auto [inst, addr] = isa::pep9::definition.riproll[opcode];
	return is_opcode_unary(inst->mnemonic);
}
bool is_store(instruction_mnemonic mnemon)
{
	if(mnemon == instruction_mnemonic::STBA ||
		mnemon == instruction_mnemonic::STWA) return true;
	else return false;
}
bool is_store(uint8_t opcode)
{
	auto [inst, addr] = isa::pep9::definition.riproll[opcode];
	return is_store(inst->mnemonic);
}
};