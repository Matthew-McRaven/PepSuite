cmake_minimum_required(VERSION 3.10)


set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# add the executable
#add_executable(pep9 pep9.cpp)
add_executable(pep10 pep10.cpp)

# Allow version header to be included
#target_link_libraries(pep9 RTL-Lib)
# Reduces filesizes by a lot, and still seems to produce working executables.
# See link for details: https://github.com/emscripten-core/emscripten/issues/11973
target_link_libraries(pep10 PUBLIC -Wl,--whole-archive RTL-Lib -Wl,--no-whole-archive)
#target_link_libraries(pep10 PUBLIC RTL-Lib)

#set_target_properties(pep9 PROPERTIES 
#	LINK_FLAGS " -s DEMANGLE_SUPPORT=1 -s ALLOW_MEMORY_GROWTH=1 -s DISABLE_EXCEPTION_CATCHING=0 -s LINKABLE=1 -s MODULARIZE --bind"
#	RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/build/packages/core")
set_target_properties(pep10 PROPERTIES 
	LINK_FLAGS " -s DEMANGLE_SUPPORT=1 -s ALLOW_MEMORY_GROWTH=1 -s DISABLE_EXCEPTION_CATCHING=0 -s MODULARIZE --bind"
	RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/build/packages/core")

file(COPY node/. DESTINATION ${CMAKE_CURRENT_BINARY_DIR})
file(COPY node/. DESTINATION "${CMAKE_SOURCE_DIR}/build/packages/core")
