const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const NormalizeChunksPlugin = require('./plugins/NormalizeChunksPlugin');
const HotManifestPlugin = require('./plugins/HotManifestPlugin');

module.exports = ({ buildPath, isProduction, isHot, port }, otherPlugins = []) => {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new NormalizeChunksPlugin({
      path: buildPath,
    }),
    new HotManifestPlugin({ isHot, port, path: buildPath }),
    ...otherPlugins,
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
