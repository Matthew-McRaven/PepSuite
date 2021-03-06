#pragma once

#include <climits>
#include <list>
#include <string>

#include "masm/project/section.hpp"

namespace masm {

enum class message_type {
    kStatus = 0,
    kWarning = 1,
    kError = 2,
};

struct message {
    message_type type;
    std::string message;
};

template <typename address_size_t> class message_handler {
  public:
    using message_t = std::tuple<std::shared_ptr<masm::elf::code_section<address_size_t>> /*section*/,
                                 uint32_t /*line*/, message /*message*/>;
    void log_message(std::shared_ptr<masm::elf::code_section<address_size_t>> section, uint32_t line, message message);
    std::list<std::tuple<uint32_t /*line*/, message>>
    errors_for_section(std::shared_ptr<masm::elf::code_section<address_size_t>> &section, bool recurse = false);
    const std::list<message_t> &messages() const;

  private:
    std::list<message_t> messages_;
};

} // End namespace masm

#include "message_handler.tpp"