#pragma once

#include <cstdint>
#include <type_traits>
#include <vector>

#include <boost/range/any_range.hpp>
#include <boost/range/join.hpp>

#include "base.hpp"
#include "helper.hpp"

namespace components::storage {
// TODO: Refactor using a memory span.
template <typename offset_t, bool enable_history = true, typename val_size_t = uint8_t>
requires(components::storage::UnsignedIntegral<offset_t> &&components::storage::Integral<val_size_t>) class Layered
    : public components::storage::Base<offset_t, enable_history, val_size_t> {
  public:
    enum class ReadMiss {
        kDefaultValue,
        kOOB,
    };
    enum class WriteMiss {
        kIgnore,
        kOOB,
    };

    using storage_t = std::shared_ptr<components::storage::Base<offset_t, enable_history, val_size_t>>;
    // TODO: Rule of 5.
    // TODO: Copy-swap.
    // Allocating underlying storage can fail, but we can't recover from this error. Terminate directly.
    Layered(offset_t max_offset, val_size_t default_value, ReadMiss read_policy,
            WriteMiss write_policy) requires(enable_history);
    Layered(offset_t max_offset, val_size_t default_value, ReadMiss read_policy,
            WriteMiss write_policy) requires(!enable_history);
    virtual ~Layered() noexcept = default;
    result<void> append_storage(offset_t offset, storage_t storage);
    result<offset_t>
    storage_to_offset(const components::storage::Base<offset_t, enable_history, val_size_t> *to_find) const;

    using offset_storage_tuple_t = std::tuple<offset_t, storage_t>;
    using storage_range_t = boost::any_range<const offset_storage_tuple_t, boost::forward_traversal_tag,
                                             const offset_storage_tuple_t &, std::ptrdiff_t>;
    auto contained_storage() const -> decltype(storage_range_t{});

    void clear(val_size_t fill_val = 0) override;
    // Read / Write functions that may generate signals or trap for IO.
    result<val_size_t> get(offset_t offset) const override;
    result<void> set(offset_t offset, val_size_t value) override;
    result<val_size_t> read(offset_t offset) const override;
    result<void> write(offset_t offset, val_size_t value) override;

    // Return the most deeply nested device of a grouped device. If the device is not a grouped device, return this.
    // If offset is out of bounds, return an OOB-related error code.
    virtual result<const Base<offset_t, enable_history, val_size_t> *> device_at(offset_t offset) const override;
    virtual result<Base<offset_t, enable_history, val_size_t> *> device_at(offset_t offset) override;

    // Provide  building block of `undo` using layered deltas.
    bool deltas_enabled() const override;
    result<void> clear_delta() override;
    result<std::unique_ptr<components::delta::Base<offset_t, val_size_t>>> take_delta() override;

    // Number of bytes contained by this chip
    // offset_t max_offset() const noexcept;
    // Change the size of the chip at runtime, to avoid creating and deleting
    // an excessive number of chip instances.
    result<void> resize(offset_t new_offset) override;

  private:
    val_size_t _default_value;
    ReadMiss _read_policy;
    WriteMiss _write_policy;
    std::vector<offset_storage_tuple_t> _storage;
};

}; // End namespace components::storage

#include "layered.tpp"