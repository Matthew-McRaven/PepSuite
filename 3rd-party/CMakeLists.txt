get_property(LINKED_3RD_PARTY GLOBAL PROPERTY LINKED_3RD_PARTY_PROPERTY)
if(NOT DEFINED LINKED_3RD_PARTY)
	message(HERE)
	add_subdirectory(catch)

	# Must set, otherwise cereal will attempt to import a package that does not yet exist.
	set(SKIP_PERFORMANCE_COMPARISON true)
	# Code has warnings I would like to ignore. By default, warnings are upgraded to errors.
	set(WITH_WERROR false)
	add_subdirectory(cereal)

	add_subdirectory(cli11)
	add_subdirectory(ELFIO)
	add_subdirectory(fmt)
	add_subdirectory(magic_enum)
	add_subdirectory(outcome)
	find_package(Boost 1.76.0 REQUIRED)
	set_property(GLOBAL PROPERTY LINKED_3RD_PARTY_PROPERTY 1)
endif()