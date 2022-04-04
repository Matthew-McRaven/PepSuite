#include "elf_tools/elf_helper.hpp"
#include "sstream"

std::vector<uint8_t> elf_tools::as_bytes(const ELFIO::elfio &image) {
    std::ostringstream stream;
    // This method should be const, but it isn't, so we have to do an evil cast.
    const_cast<ELFIO::elfio&>(image).save(stream);
    // Unfortunate copy of the stream. 
    // We should do this so rarely that is does not matter.
    auto bytes = stream.str();
    return std::vector<uint8_t>(bytes.data(), bytes.data()+bytes.length());
}

ELFIO::section *elf_tools::find_section(ELFIO::elfio &image, const std::string &name) {
    ELFIO::section *sec = nullptr;
    // Section 0 contains nothing useful, so we can skip it with preincrement.
    for (auto i = 0; i < image.sections.size(); ++i) {
        auto local_sec = image.sections[i];
        if (local_sec->get_name() == name)
            sec = local_sec;
    }
    return sec;
}

ELFIO::section *elf_tools::find_section(const ELFIO::elfio &image, const std::string &name) {
    ELFIO::section *sec = nullptr;
    // Section 0 contains nothing useful, so we can skip it with preincrement.
    for (auto i = 0; i < image.sections.size(); ++i) {
        auto local_sec = image.sections[i];
        if (local_sec->get_name() == name)
            sec = local_sec;
    }
    return sec;
}

result<std::vector<uint8_t>> elf_tools::section_as_bytes(const ELFIO::elfio &image, const std::string &name) {
    auto sec = find_section(image, name);
    if (sec == nullptr)
        return {system_error2::errc::invalid_argument};

    return std::vector<uint8_t>(sec->get_data(), sec->get_data() + sec->get_size());
}