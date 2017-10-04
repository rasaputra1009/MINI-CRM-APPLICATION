const baseConfig = require('../../../webpack');
const NormalizeChunksPlugin = require('../../../webpack/plugins/NormalizeChunksPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');


module.exports = baseConfig({
  entry: [path.resolve(__dirname, 'app/index.js')],
  appName: 'global',
  loaders() {
    return [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ];
  },

  plugins({ buildPath }) {
    return [
      new ExtractTextPlugin('global.[chunkhash].css'),
      new NormalizeChunksPlugin({
        path: buildPath,
      }),
    ];
  },
  overridePlugins: true,
  overrideLoaders: true,
});
