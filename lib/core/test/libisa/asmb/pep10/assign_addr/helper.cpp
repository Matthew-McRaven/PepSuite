#include "helper.hpp"

std::shared_ptr<asmb::pep10::assign_addr::driver_t> asmb::pep10::assign_addr::make_driver()
{
	using namespace asmb::pep10::assign_addr;
	auto driver = std::make_shared<driver_t>();

	auto tokenizer = std::make_shared<masm::frontend::tokenizer<uint16_t, tokenizer_t> >();
	transform_t tx_tokenizer = [=](project_t& proj, std::list<driver_t::work_t>& work) {
		bool success = true;
		driver_t::work_iterable_t result_work;
		std::transform(work.begin(), work.end(), std::back_inserter(result_work),[&](auto& value){
				success &= tokenizer->tokenize(proj, std::get<driver_t::section_t>(value));
				return driver_t::work_iterable_t::value_type{stage_t::TOKEN, value};
			});
		return driver_t::result_t{success, result_work};
	};
	driver->register_transform(tx_tokenizer, stage_t::RAW);

	auto preproc = std::make_shared<masm::frontend::preprocessor<uint16_t, tokenizer_t> >();
	transform_t tx_preproc = [=](project_t& proj, std::list<driver_t::work_t>& work) {
		bool success = true;
		driver_t::work_iterable_t result_work;
		for(auto value : work) {
			auto [local_success, local_children] = preproc->preprocess(proj, std::get<driver_t::section_t>(value));
			for(auto child : local_children) {
				result_work.emplace_back(driver_t::work_iterable_t::value_type{stage_t::RAW, 
					std::static_pointer_cast<masm::elf::code_section<uint16_t>>(child)});
			}
			result_work.emplace_back(driver_t::work_iterable_t::value_type{stage_t::PREPROCESS, value});
			success &= local_success;
		}
		return driver_t::result_t{success, result_work};
	};
	driver->register_transform(tx_preproc, stage_t::TOKEN);

	auto parser = std::make_shared<asmb::pep10::parser>();
	transform_t tx_parser = [=](project_t& proj, std::list<driver_t::work_t>& work) {
		bool success = true;
		driver_t::work_iterable_t result_work;
		std::transform(work.begin(), work.end(), std::back_inserter(result_work),[&](auto& value){
				success &= parser->parse(proj, std::get<driver_t::section_t>(value));
				return driver_t::work_iterable_t::value_type{stage_t::SYMANTIC, value};
			});
		return driver_t::result_t{success, result_work};
	};
	driver->register_transform(tx_parser, stage_t::PREPROCESS);

	masm::backend::region<uint16_t> node;
	node.input_sections = {"os"};
	node.base_address = 0;
	transform_t tx_addr = [=](project_t& proj, std::list<driver_t::work_t>& work) {
		bool success = true;
		std::set<std::shared_ptr<masm::elf::image<uint16_t>>> images;
		for(auto& value : work) {
			images.insert(std::get<driver_t::section_t>(value)->containing_image.lock());
		}

		driver_t::work_iterable_t result_work;
		std::transform(images.begin(), images.end(), std::back_inserter(result_work),[&](auto image){
			masm::backend::assign_image(proj, image, {node});
			return driver_t::work_iterable_t::value_type{stage_t::ADDRESS_ASSIGN, image};
		});
		return driver_t::result_t{success, result_work};
	};
	driver->register_transform(tx_addr, stage_t::SYMANTIC);
	return driver;
}