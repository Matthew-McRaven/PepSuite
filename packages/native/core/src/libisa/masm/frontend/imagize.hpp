#pragma once

#include "masm/project/image.hpp"
#include "masm/project/project.hpp"

namespace masm::frontend {
template <typename address_size_t>
std::shared_ptr<masm::elf::image<address_size_t>>
text_to_image(std::shared_ptr<masm::project::project<address_size_t>> &project,
              std::shared_ptr<masm::project::source_file> os, std::shared_ptr<masm::project::source_file> user);
}
#include "imagize.tpp"