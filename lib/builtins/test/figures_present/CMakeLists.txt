cmake_minimum_required(VERSION 3.13)

# set the project name
project(figures_present VERSION 1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# add the executable
file(GLOB_RECURSE sources CONFIGURE_DEPENDS "**/*.cpp" "*.cpp")
add_executable (figures_present ${sources})
target_link_libraries(figures_present catch magic_enum builtins)

add_test (NAME figures_present COMMAND figures_present -r junit --out junit.xml)


