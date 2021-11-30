
mkdir -p build
cd build

(
	source /emsdk/emsdk_env.sh
	mkdir -p native
	cd native
	cmake ../.. -DCMAKE_C_COMPILER=$(which clang) -DCMAKE_CXX_COMPILER=$(which clang++) -DCMAKE_BUILD_TYPE=RelWithDebInfo -DENABLE_TESTING=1
	make -j$(nproc) && make test -j$(nproc)
)
