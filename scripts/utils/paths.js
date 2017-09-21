const { resolve } = require('path');


const root = resolve(__dirname, '../..');

const assets = resolve(root, 'resources/src');

const publicPath = resolve(root, 'public');

module.exports = {
  root,
  assets,
  publicPath,
};
