cmake_minimum_required(VERSION 3.10)

if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
  if(CMAKE_CXX_COMPILER_VERSION VERSION_LESS 10.0)
    message(FATAL_ERROR "Insufficient gcc version")
  endif()
elseif(CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
  if(CMAKE_CXX_COMPILER_VERSION VERSION_LESS 14.0)
    message(FATAL_ERROR "Insufficient msvc version")
  endif()
endif()

# Magic code from:
# 	https://dpiepgrass.medium.com/cmake-fights-against-disabling-in-source-builds-ab1d71c1d26f
# Do this before project() to skip the compiler config process
if ("${CMAKE_BINARY_DIR}" STREQUAL "${CMAKE_SOURCE_DIR}") 
  message(FATAL_ERROR "In-source builds are disabled.
    Please create a subfolder and use `cmake ..` inside it.")
endif()
# Disable in-tree builds
set(CMAKE_DISABLE_SOURCE_CHANGES ON)
set(CMAKE_DISABLE_IN_SOURCE_BUILD ON)


# set the project name
project(RTL-Model VERSION 1.0)

configure_file(src/libisa/version.hpp.in src/libisa/version.hpp)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_subdirectory(src)

if(NOT DEFINED LINKED_3RD_PARTY)
  add_subdirectory(../../3rd-party build/3rd-party)
  set(LINKED_3RD_PARTY 1)
endif()


if(DEFINED ENABLE_TESTING AND ENABLE_TESTING)
  set(_ENABLE_TESTING_CORE 1)
  set(ENABLE_TESTING 0 CACHE BOOL "" FORCE)
endif()
add_subdirectory(../ngraph build/ngraph)
add_subdirectory(../builtins build/builtins)
if(DEFINED _ENABLE_TESTING_CORE)
  set(ENABLE_TESTING ${_ENABLE_TESTING_CORE})
endif()

if(ENABLE_TESTING)
  enable_testing()
  add_subdirectory(test)
endif()