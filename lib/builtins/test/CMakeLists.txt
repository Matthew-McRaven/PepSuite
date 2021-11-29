if(!LINKED_3RD_PARTY)
  add_subdirectory(../../3rd-party build/3rd-party)
  set(LINKED_3RD_PARTY)
endif()

add_subdirectory(figures_present)