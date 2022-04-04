const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './dist/index.js'),
  module: {
    rules: [
      {
        test: /\.wasm/,
        type: 'javascript/auto',
        use: {
          loader: '@wasm-tool/wasi',
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
    fallback: {
      path: false,
      process: false,
      fs: false,
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
