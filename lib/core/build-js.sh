source /emsdk/emsdk_env.sh
npm run prebuild

mkdir -p build
cd build
(
	mkdir -p js
	cd js
	emcmake cmake -DBoost_INCLUDE_DIR=/boost/ ../.. -DCMAKE_BUILD_TYPE=RelWithDebInfo
	emmake make -j$(nproc)
	emmake make test -j$(nproc)
)