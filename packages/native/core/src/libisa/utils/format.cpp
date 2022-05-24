
#include "format.hpp"

#include <iostream>
#include <sstream>

#include <fmt/core.h>

std::string utils::bytes_to_nbit_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, uint8_t base,
                                        uint8_t interchar_space, bool include_zz, bool include_spaces) {
    // Function called very often, so pre-allocate format strings
    const std::string format_2 = "{:08b}";
    const std::string format_8 = "{:04o}";
    const std::string format_16 = "{:02X}";

    // Write to stringstream instead of appending to string, supposed to be faster, need benchmark.
    std::stringstream ss;

    // Choose the appropriate format string based on the base.
    const std::string *fmt = nullptr;
    switch (base) {
    case 2:
        fmt = &format_2;
        break;
    case 8:
        fmt = &format_8;
        break;
    case 16:
        fmt = &format_16;
        break;
    }

    // Check for valid base, otherwise vformat would explode.
    if (fmt == nullptr)
        throw std::invalid_argument("base must be in {2,8,16}");
    else if (interchar_space <= 0)
        throw std::invalid_argument("interchar_space must be positive");
    // Expand bytes into strings of a given base, optionally space/newline delimited.
    for (int i = 0; i < bytes.size(); i++) {
        auto formatted = fmt::vformat(*fmt, fmt::make_format_args(bytes[i]));
        // Insert a space every `interchar_space` characters, except don't add one at the end.
        for (auto split = 0; split < formatted.size(); split += interchar_space) {
            ss << formatted.substr(split, interchar_space);
            if (split + interchar_space < formatted.size())
                ss << " ";
        }
        if (include_spaces)
            ss << (((i % bytes_per_line) == bytes_per_line - 1) ? "\n" : " ");
    }

    if (include_zz)
        ss << "zz";
    return ss.str();
}

std::string utils::bytes_to_hex_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, bool include_zz,
                                       bool include_spaces, uint8_t interchar_space) {
    return bytes_to_nbit_string(bytes, bytes_per_line, 16, interchar_space, include_zz, include_spaces);
}

std::string utils::bytes_to_bit_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, bool include_zz,
                                       bool include_spaces, uint8_t interchar_space) {
    return bytes_to_nbit_string(bytes, bytes_per_line, 2, interchar_space, include_zz, include_spaces);
}