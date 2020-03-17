const path = require('path');
const plugins = require('./plugins');
const loaders = require('./loaders');

const getConfig = require('./config');


function baseConifg(options = {}) {
  const {
    appName, commonsPath, buildPath, isProduction, isHot, port,
  } = getConfig(options);
  const currentConfig = {
    buildPath, isProduction, isHot, port,
  };
  const { config: optionsConfig = {} } = options;
  const defaultEntry = path.resolve(process.cwd(), 'app/app.js');
  const {
    entry = [defaultEntry],
    loaders: optLoaders = () => [],
    plugins: optPlugins = () => [],
    overrideLoaders = false,
    overridePlugins = false,
    optimization,
  } = options;

  return {
    mode: isProduction ? 'production' : 'development',
    entry: [
      'react-hot-loader/patch',
      ...entry,
    ],
    output: {
      path: buildPath,
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      publicPath: isHot ? `http://localhost:${port}/build/${appName}/` : `/build/${appName}/`,
    },
    module: {
      rules: overrideLoaders ? optLoaders(currentConfig) : loaders(currentConfig, optLoaders(currentConfig)),
    },
    plugins: overridePlugins ? optPlugins(currentConfig) : plugins(currentConfig, optPlugins(currentConfig)),
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
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      ...optimization,
    },
    devtool: isProduction ? undefined : 'inline-source-map',
    ...optionsConfig,
  };
}

module.exports = baseConifg;
