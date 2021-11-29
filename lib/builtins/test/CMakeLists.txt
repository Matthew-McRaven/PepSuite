if(NOT DEFINED LINKED_3RD_PARTY)
  add_subdirectory(../../3rd-party build/3rd-party)
  set(LINKED_3RD_PARTY 1)
endif()

add_subdirectory(figures_present)