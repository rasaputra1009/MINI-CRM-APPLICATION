const NormalizeChunksPlugin = require('normalize-chunks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const baseConfig = require('../../../webpack');

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
