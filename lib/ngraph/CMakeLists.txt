cmake_minimum_required(VERSION 3.10)

# set the project name
project(ngraph VERSION 1.0)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# add the executable
add_library(ngraph INTERFACE)
target_include_directories(ngraph INTERFACE .)