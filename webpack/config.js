const minimist = require('minimist');
const path = require('path');
const { assets, publicPath } = require('../scripts/utils/paths');

const args = minimist(process.argv.slice(2));

const appName = path.basename(process.cwd());
const commonsPath = path.resolve(assets, 'common/app');

const isProduction = process.env.NODE_ENV === 'production';
const isHot = args.hot || false;
const port = args.port || 8080;


module.exports = (options = {}) => ({
  appName: options.appName || appName,
  commonsPath,
  buildPath: options.buildPath || path.resolve(publicPath, 'build', options.appName || appName),
  isProduction,
  isHot,
  port,
});
