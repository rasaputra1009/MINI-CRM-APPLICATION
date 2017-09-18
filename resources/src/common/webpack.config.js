const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NormalizeChunksPlugin = require('./webpack/plugins/NormalizeChunksPlugin');

const buildPath = path.resolve(__dirname, '../../../public/build/global');

module.exports = {
  entry: path.resolve('./app/index.js'),
  output: {
    filename: 'globalStyles.[chunkhash].js',
    path: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('globalStyles.[chunkhash].css'),
    new NormalizeChunksPlugin({
      path: buildPath,
    }),
  ],
};
