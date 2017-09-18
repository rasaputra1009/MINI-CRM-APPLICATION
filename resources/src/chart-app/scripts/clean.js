const rm = require('rimraf');
const { buildPath } = require('../webpack/config');

rm(buildPath, () => {});
