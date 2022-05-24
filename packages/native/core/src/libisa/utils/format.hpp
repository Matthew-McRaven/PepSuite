#pragma once

#include <cstdint>
#include <string>
#include <vector>

namespace utils {
// Throws for bases other than 2,8,16.
std::string bytes_to_nbit_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, uint8_t base,
                                 uint8_t interchar_space, bool include_zz = true, bool include_spaces = true);
std::string bytes_to_hex_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, bool include_zz = true,
                                bool include_spaces = true, uint8_t interchar_space = 2);
std::string bytes_to_bit_string(const std::vector<uint8_t> &bytes, uint16_t bytes_per_line, bool include_zz = true,
                                bool include_spaces = true, uint8_t interchar_space = 4);
} // namespace utils