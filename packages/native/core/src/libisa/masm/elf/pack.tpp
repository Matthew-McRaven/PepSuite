#include "pack.hpp"
#include <iostream>
#include <sstream>
#include <elfio/elfio.hpp>
#include <magic_enum.hpp>

#include "masm/elf/mmio.hpp"
#include "masm/project/section.hpp"
#include "symbol/types.hpp"
template <typename addr_size_t>
auto masm::elf::pack_image(std::shared_ptr<masm::project::project<addr_size_t>> &project,
	std::shared_ptr<masm::elf::image<addr_size_t> >& image
) -> std::pair<bool, std::istream&&>
{
    std::stringstream stream;
    using namespace ELFIO;
    elfio writer;

    writer.create(ELFCLASS32, ELFDATA2LSB);
    writer.set_os_abi(ELFOSABI_LINUX);
    writer.set_type(ET_REL);
    writer.set_machine(0x8088);
    using sec_pair = std::pair<std::string, decltype(image->os)>;
    std::list<sec_pair> sections = {{"os", image->os}, {"user", image->user}};
    for (auto &[prefix, section] : sections) {
		if(!section) continue;
        auto elf_section = writer.sections.add(prefix + ".text");
        elf_section->set_type(SHT_PROGBITS);
        elf_section->set_flags(SHF_ALLOC | SHF_EXECINSTR | SHF_WRITE);
        elf_section->set_addr_align(0x1);
        auto as_code_section = std::static_pointer_cast<const masm::elf::code_section<addr_size_t>>(section);
        auto as_byte_vec = masm::elf::to_bytes(as_code_section);
        elf_section->set_data((const char *)as_byte_vec.data(), as_byte_vec.size());

        addr_size_t base_address = 0;

        // Must track symbols who are MMIO-typed symbols to add the OS.MMIO section.
        std::map<std::string, masm::elf::mmio::Type> inout_mappings;
        // Base address is the first byte that actually generates object code.
		for(const auto& line : as_code_section->body_ir->ir_lines)
		{
            if (auto as_in = std::dynamic_pointer_cast<masm::ir::dot_input<addr_size_t>>(line); as_in) {
                inout_mappings[as_in->argument->string()] = masm::elf::mmio::Type::kInput;
			}
			else if(auto as_out = std::dynamic_pointer_cast<masm::ir::dot_output<addr_size_t>>(line); as_out){
                inout_mappings[as_out->argument->string()] = masm::elf::mmio::Type::kOutput;
            }

			if(!line->emits_object_code) continue;
            else {
                base_address = line->base_address();
                break;
            }
        }
        elf_section->set_address(base_address);

        // Write symbol table.
        auto symbols = section->symbol_table->entries();
        auto str_tab = writer.sections.add(prefix + ".strtab");
        str_tab->set_type(SHT_STRTAB);
        // Create string table writer
        string_section_accessor str_ac(str_tab);


        // Create symbol table section
        auto sym_tab = writer.sections.add(prefix + ".symtab");
        sym_tab->set_type(SHT_SYMTAB);
        sym_tab->set_info(1 + std::distance(cbegin(symbols), cend(symbols)));
        sym_tab->set_addr_align(0x2);
        sym_tab->set_entry_size(writer.get_default_entry_size(SHT_SYMTAB));
        sym_tab->set_link(str_tab->get_index());

        std::vector<masm::elf::mmio::Definition> mmio_defs;
        // Create symbol table writer
        symbol_section_accessor sym_ac(writer, sym_tab);
        for (auto symbol : symbols) {
            using namespace magic_enum::ostream_operators;
            std::cout << symbol->value->type() << std::endl;
            auto binding = STB_LOCAL;
			if(symbol->binding == symbol::binding_t::kGlobal) binding = STB_GLOBAL;
			else if(symbol->binding == symbol::binding_t::kImported) binding = STB_WEAK;

            int type = STT_NOTYPE;
            int symbol_section_index = SHN_UNDEF;
            switch (symbol->value->type()) {
            case symbol::Type::kObject:
                type = STT_OBJECT;
                symbol_section_index = elf_section->get_index();
                break;
            case symbol::Type::kCode:
                type = STT_FUNC;
                symbol_section_index = elf_section->get_index();
                break;
            case symbol::Type::kConstant:
                type = STT_OBJECT;
                symbol_section_index = SHN_ABS;
                break;
            }

            auto index = sym_ac.add_symbol(str_ac, symbol->name.data(), symbol->value->value(), symbol->value->size(),
                                           binding, type, 0, symbol_section_index);
            // If the symbol is an MMIO location, insert an MMIO definition into the list.
            if (auto x = inout_mappings.find(symbol->name); x != inout_mappings.end()) {
                // NOTE: While indecies are 32 bit, I don't expect to ever have more than 2^16 bit symbols.
                mmio_defs.emplace_back(masm::elf::mmio::Definition{x->second, static_cast<uint16_t>(index)});
            }
        }

        if (prefix == "os") {
            // Create symbol table section
            auto mmio_sec = writer.sections.add(prefix + ".mmio");
            mmio_sec->set_type(SHT_LOUSER + 0x01);
            // Record the number of entries in the INFO field.
            mmio_sec->set_info(std::distance(cbegin(mmio_defs), cend(mmio_defs)));
            mmio_sec->set_addr_align(0x4);
            mmio_sec->set_entry_size(writer.get_default_entry_size(0x04));
            mmio_sec->set_link(sym_tab->get_index());
            auto mmio_defs_bytes = masm::elf::mmio::to_bytes(mmio_defs);
            mmio_sec->set_data((const char *)mmio_defs_bytes.data(), mmio_defs_bytes.size());
        }
    }

    // Do not generate relocation entries, since Pep/9 and 10 programs are not relocatable.
	if(false) writer.set_entry( 0 );
    writer.save(stream);
    writer.save("hello.elf");
    return {true, std::move(stream)};
}