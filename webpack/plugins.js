const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NormalizeChunksPlugin = require('./plugins/NormalizeChunksPlugin');
const HotManifestPlugin = require('./plugins/HotManifestPlugin');

module.exports = ({ buildPath, isProduction, isHot, port }, otherPlugins = []) => {
  const plugins = [
    new NormalizeChunksPlugin({
      path: buildPath,
    }),
    new HotManifestPlugin({ isHot, port, path: buildPath }),
    ...otherPlugins,
  ];

  if (isProduction) {
    return [
      ...plugins,
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ];
  }

  return plugins;
};
