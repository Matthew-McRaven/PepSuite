#include "utils/convert.hpp"

#include <sstream>

#include <boost/algorithm/string.hpp>
#include <boost/algorithm/string/classification.hpp>
#include <boost/algorithm/string/split.hpp>

std::vector<uint8_t> utils::parse_object_bytes(const std::string& str) {
    char* endptr;
    std::vector<std::string> maybe_bytes;
    boost::split(maybe_bytes, str, boost::is_any_of("\r\n "), boost::token_compress_on);
    
    std::vector<uint8_t> bytes;
    for(const auto& maybe_byte : maybe_bytes) {
        if(boost::iequals(maybe_byte, "ZZ")) break;
        unsigned long number = strtoul(maybe_byte.c_str(), & endptr, 16 );
        if (* endptr != 0) return {};
        else if (number>=256) return {};
        else bytes.emplace_back(number);
    }
    return bytes;
}