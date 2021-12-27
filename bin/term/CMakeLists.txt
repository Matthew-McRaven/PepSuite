cmake_minimum_required(VERSION 3.10)


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

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)



if(DEFINED ENABLE_TESTING AND ENABLE_TESTING)
  set(_ENABLE_TESTING_TERM 1)
  set(ENABLE_TESTING 0 CACHE BOOL "" FORCE)
endif()
add_subdirectory(../../packages/native/core/ core)
if(DEFINED _ENABLE_TESTING_TERM)
  set(ENABLE_TESTING ${_ENABLE_TESTING_TERM})
endif()

if(ENABLE_TESTING)
  enable_testing()
  add_subdirectory(test)
endif()

add_subdirectory(src)
