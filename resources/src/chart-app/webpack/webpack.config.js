const path = require('path');
const plugins = require('./plugins.js');
const loaders = require('./loaders');

const { appName, commonsPath, buildPath, isProduction, isHot, port } = require('./config');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../app/app.js'),
  ],
  output: {
    path: buildPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: isHot ? `http://localhost:${port}/build/${appName}/` : `/build/${appName}`,
  },
  module: {
    rules: loaders(),
  },
  plugins: plugins(),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      commons: commonsPath,
    },
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Method': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
  target: 'web',
  devtool: isProduction ? undefined : 'inline-source-map',
};
