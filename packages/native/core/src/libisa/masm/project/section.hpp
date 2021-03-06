#pragma once

#include <climits>
#include <map>
#include <optional>
#include <string>
#include <vector>

#include <boost/algorithm/string/classification.hpp> // Include boost::for is_any_of
#include <boost/algorithm/string/split.hpp>          // Include for boost::split
#include <ngraph.hpp>

#include "masm/frontend/tokens.hpp"
#include "masm/ir/base.hpp"
#include "masm/macro.hpp"
#include "masm/registry.hpp"

namespace masm::elf {
template <typename address_size_t> class macro_subsection;

template <typename address_size_t> class image;
} // namespace masm::elf

namespace masm::elf::code {
struct raw {
    std::string text;
    std::vector<std::string> lines;
};
struct token {
    using line_t = std::vector<std::pair<masm::frontend::token_type, std::string>>;
    std::vector<line_t> tokens;
};

template <typename address_size_t> struct pre {
    std::map<uint16_t, std::shared_ptr<masm::elf::macro_subsection<address_size_t>>> macro_line_mapping;
};

template <typename address_size_t> struct ir {
    // If no burn is present, optional will be std::nullopt. If a single BURN
    // is present, then this will contain the hex argument. If multiple BURNs
    // are present, assembling to IR will fail, and an error will be raised.
    std::optional<uint16_t> BURN_address = std::nullopt;
    std::vector<std::shared_ptr<masm::ir::linear_line<address_size_t>>> ir_lines;
    void *stack_trace_info;
};
} // namespace masm::elf::code

namespace masm::elf {

enum class program_type { kUserProgram, kOperatingSystem };
struct section_info {
    uint16_t index;
    std::string name;
    program_type section_type = program_type::kUserProgram;
};

template <typename address_size_t> struct code_section {
    virtual ~code_section() = default;
    section_info header;
    std::weak_ptr<masm::elf::image<address_size_t>> containing_image;
    std::shared_ptr<symbol::LeafTable<address_size_t>> symbol_table;

    std::optional<code::raw> body_raw;
    std::optional<code::token> body_token;
    std::optional<code::pre<address_size_t>> body_preprocess;
    std::optional<code::ir<address_size_t>> body_ir;
};

template <typename address_size_t> struct macro_subsection;

template <typename address_size_t> struct top_level_section : public code_section<address_size_t> {
    virtual ~top_level_section() = default;

    using macro_index_t = decltype(section_info().index);
    using invoke_class_t = uint32_t;

    NGraph::tGraph<invoke_class_t> invoke_dependency_graph;
    std::map<std::pair<std::string, std::vector<std::string>>, invoke_class_t> macro_def_to_invoke_class;
    // Lookup macro found a section info index.
    std::map<macro_index_t, std::shared_ptr<macro_subsection<address_size_t>>> index_to_macro;
    invoke_class_t add_or_get_invoke_class(const std::shared_ptr<code_section<address_size_t>> &section);
    std::shared_ptr<macro_subsection<address_size_t>>
    insert_macro(std::shared_ptr<code_section<address_size_t>> direct_parent, uint32_t line_number,
                 std::string macro_name, std::vector<std::string> macro_args, std::string macro_text);
};

template <typename address_size_t> struct macro_subsection : public code_section<address_size_t> {
    virtual ~macro_subsection() = default;
    std::weak_ptr<code_section<address_size_t>> direct_parent;
    std::weak_ptr<top_level_section<address_size_t>> containing_section;
    uint32_t line_number;
    std::vector<std::string> macro_args;
};

/*
 * Helper methods
 */
template <typename address_size_t>
std::vector<uint8_t> to_bytes(std::shared_ptr<const code_section<address_size_t>> section);
// Check if a macro with a certain set of args exists withing a top level section.
// TODO: Implement
template <typename address_size_t>
std::optional<std::shared_ptr<macro_subsection<address_size_t>>>
macro_from_name(std::shared_ptr<top_level_section<address_size_t>> containing_section, std::string macro_name,
                std::optional<std::vector<std::string>> macro_args = std::nullopt);

// Determine which line number in the containing section eventually points to a particular macro
// TODO: Implement
template <typename address_size_t>
uint32_t map_macro_to_container_line(std::shared_ptr<macro_subsection<address_size_t>> macro);

template <typename address_size_t> struct link_result {
    std::optional<std::shared_ptr<macro_subsection<address_size_t>>> section_ptr;
    std::optional<std::string> message;
};

static const std::string kNoSuchMacro = "The macro {} does not exist.";
static const std::string kArgcMismatch = "The macro {} expected {} arguments, but was invoked with {} arguments.";
static const std::string kNoRelation = "The containing_section was unrelated to direct_parent.";

} // namespace masm::elf

#include "section.tpp"