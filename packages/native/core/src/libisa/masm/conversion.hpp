#pragma once

#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>
namespace masm {

// Post: Returns true if str starts with the characters 0x or 0X. Otherwise returns false.
bool startsWithHexPrefix(const std::string &str);

template <typename Iterator> bool parse_byte_character(Iterator &start, Iterator end, uint8_t &value) {
    // If start == end, then there are no characters to parse!
    if (start == end) {
        return false;
    }
    char head = *start++;
    if (head == '\\') {
        if (start == end)
            return false;
        head = *start++;
        if (head == 'b') { // backspace
            value = 8;
        } else if (head == 'f') { // form feed
            value = 12;
        } else if (head == 'n') { // line feed (new line)
            value = 10;
        } else if (head == 'r') { // carriage return
            value = 13;
        } else if (head == 't') { // horizontal tab
            value = 9;
        } else if (head == 'v') { // vertical tab
            value = 11;
        } else if (head == 'x' || head == 'X') { // hex strings!
            // Need at least two more characters to consume.
            if (end - start < 2)
                return false;
            else {
                char *end;
                char copied[] = {*(start++), *(start++), '\0'};
                value = strtol(copied, &end, 16);
                if (*end != '\0')
                    return false;
            }
        } else {

            throw std::logic_error("I don't know where this was ever used!");
            value = static_cast<uint8_t>('\\');
        }
    } else {
        value = head;
    }
    return true;
}

// Pre: str is a character or string stripped of its single or double quotes.
// Post: The sequence of characters representing the first possibly \ quoted character
// is stripped from the beginning of str.
// Post: value is the ASCII integer value of the first possibly \ quoted character.
template <typename value_size_t>
bool unqouted_string_to_integral(const std::string &str, int byte_length, value_size_t &value) {
    // TODO: We need a real string library that handles UTF-8.

    static const auto max_chars = sizeof(value_size_t);
    auto current_char = 0;
    size_t index = 0;
    uint8_t temp = 0;

    bool okay = true;
    auto start = str.begin();

    if (startsWithHexPrefix(str)) {
        start += 2;
    }

    // Initialize value, otherwise shifting will produce garbage.
    value = 0;

    while (okay && start != str.end()) {
        okay &= parse_byte_character(start, str.end(), temp);
        value = value << 8 | temp;
        ++current_char;
    }

    // The string contained more than `byte_length` characters! This is an error!
    if (current_char > byte_length)
        okay = false;

    return okay;
}

// Pre: str is enclosed in single (or double) quotes.
// Post: Returns the ASCII integer value of the character accounting for \ quoted characters.
template <typename value_size_t> bool quoted_string_to_integral(const std::string &str, value_size_t &value) {
    auto view = str.substr(1, str.size() - 2);
    return unqouted_string_to_integral(str, value);
}

// Pre: String is unquoted.
// Post: Returns the byte length of str accounting for possibly \ quoted characters.
size_t byte_string_length(const std::string &str);

// Pre: String is unquoted.
// Post: Returns the vector of all bytes in the string as parsed by parse_byte_character.
std::vector<uint8_t> byte_vector(const std::string &str);
}; // namespace masm
