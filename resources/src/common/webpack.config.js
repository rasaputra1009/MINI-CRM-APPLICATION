const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NormalizeChunksPlugin = require('normalize-chunks-webpack-plugin');

module.exports = {
  entry: path.resolve('./app/index.js'),
  output: {
    filename: 'globalStyles.[chunkhash].js',
    path: path.resolve(__dirname, '../../../public/build/global'),
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
      path: __dirname,
    }),
  ],
};
