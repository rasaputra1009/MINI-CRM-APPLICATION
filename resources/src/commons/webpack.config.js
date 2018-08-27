const baseConfig = require('../../../webpack');
const NormalizeChunksPlugin = require('../../../webpack/plugins/NormalizeChunksPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = baseConfig({
  entry: [path.resolve(__dirname, 'app/index.js')],
  appName: 'global',
  loaders() {
    return [
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin, 'css-loader'],
      },
    ];
  },

  plugins({ buildPath }) {
    return [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new NormalizeChunksPlugin({
        path: buildPath,
      }),
    ];
  },
  overridePlugins: true,
  overrideLoaders: true,
});
