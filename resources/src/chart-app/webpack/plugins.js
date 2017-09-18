const { isProduction, isHot, port, buildPath } = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const NormalizeChunksPlugin = require('./plugins/NormalizeChunksPlugin');
const HotManifestPlugin = require('./plugins/HotManifestPlugin');


module.exports = () => {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new NormalizeChunksPlugin({
      path: buildPath,
    }),
    new HotManifestPlugin({ isHot, port, path: buildPath }),
  ];

  if (isProduction) {
    return [
      ...plugins,
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin('main.[chunkhash].css'),
    ];
  }

  return plugins;
};
