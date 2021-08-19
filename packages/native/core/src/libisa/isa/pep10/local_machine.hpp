#pragma once

#include <memory>

#include <outcome.hpp>

#include "components/delta/base.hpp"
#include "components/machine/delta.hpp"
#include "components/machine/interace.hpp"
#include "components/storage/base.hpp"
#include "isa/pep10/local_processor.hpp"
#include "isa/pep10/pep10.hpp"


namespace isa::pep10 {

template <bool enable_history>
class LocalMachine : public components::machine::MachineProcessorInterface<uint16_t, enable_history, uint8_t, isa::pep10::MemoryVector> 
{
public:
	// C.67 suppress polymorphic copy/move.
	// Construct processor in place from this.
	LocalMachine(std::shared_ptr<components::storage::Base<uint16_t, enable_history, uint8_t>> memory);
	~LocalMachine() override = default;

	/*
	 * Accessors / modifiers for processor.
	 */
	result<bool> step();
	/*
	 * Implement MachineProcessorInterface.
	 */
	bool halted() const override;
	result<uint8_t> get_memory(uint16_t address) const override;
	result<void> set_memory(uint16_t address, uint8_t value) override;
	result<uint8_t> read_memory(uint16_t address) const override;
	result<void> write_memory(uint16_t address, uint8_t value) override;
	uint16_t max_offset() const override;
	// Don't use results here. Failing a register read/write is a fatal error that will crash the progam.
	uint16_t read_register(isa::pep10::Register reg) const;
	void write_register(isa::pep10::Register reg, uint16_t value);
	bool read_csr(isa::pep10::CSR csr) const;
	void write_csr(isa::pep10::CSR csr, bool value);
	uint8_t read_packed_csr() const;
	void write_packed_csr(uint8_t value);

	result<void> unwind_active_instruction() override;
	uint16_t address_from_vector(isa::pep10::MemoryVector vector) const override;
	void clear_all(uint8_t mem_fill, uint16_t reg_fill, bool csr_fill);
	void clear_memory(uint8_t mem_fill);
	void clear_processor(uint16_t reg_fill, bool csr_fill);

	// Step back serialization / update querries.
	uint64_t current_time() const override;
	result<void> save_deltas() override;
	result<void> clear_deltas() override;
	// TODO: Determine how to flatten multiple delta iterators in to a single cohesive one.
	void* deltas_between(uint64_t start, uint64_t end) const override;
private:
	std::shared_ptr<components::storage::Base<uint16_t, enable_history, uint8_t>> _memory;
	std::shared_ptr<isa::pep10::LocalProcessor> _processor;
	std::map<uint64_t, components::machine::StepDelta<uint16_t, uint8_t, uint8_t, uint16_t, uint8_t, bool>> _deltas;

	/*
	 * Implement MachineProcessorInterface.
	 */
	void begin_transaction() override;
	void end_transaction() override;
	void begin_instruction() override;
	void end_instruction() override;
};

// Will "wrap-around" if bytes exceed maximum offset.
template<bool enable_history>
result<void> load_bytes(std::shared_ptr<LocalMachine<enable_history>> machine, std::vector<uint8_t> bytes, uint16_t offset);

} // namespace isa::pep10
#include "local_machine.tpp"