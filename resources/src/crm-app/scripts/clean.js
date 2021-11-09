const rm = require('rimraf');
const config = require('../webpack.config.js');

rm(config.output.path, () => {});
