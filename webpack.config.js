const path = require('path');
const webpack = require('webpack');

const filename = process.env.NODE_ENV === 'production' ? 'liveui-vue.production.min.js' : 'liveui-vue.development.js';

module.exports = {
  mode: 'production',
  entry: './src/RemoteComponent/index.js',
  output: {
    path: path.resolve(__dirname, 'umd'),
    filename,
    library: '@composiv/liveui-vue',
    libraryTarget: 'umd',
  },
  externals: {
    '@composiv/liveui-core': 'commonjs2 @composiv/liveui-core',
  },
  devtool: 'source-map', // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance.
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    }),
  ],
};
