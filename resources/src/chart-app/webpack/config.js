const minimist = require('minimist');
const path = require('path');
const args = minimist(process.argv.slice(2));

const appName = path.basename(path.resolve(__dirname, '..'));


const commonsPath = path.resolve(__dirname, '../../common/app');
const buildPath = path.resolve(__dirname, '../../../../public/build', appName);
const isProduction = process.env.NODE_ENV === 'production';
const isHot = args.hot || false;
const port = args.port || 8080;


module.exports = {
  appName,
  commonsPath,
  buildPath,
  isProduction,
  isHot,
  port,
};
