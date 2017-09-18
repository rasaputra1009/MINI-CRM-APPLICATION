const spawn = require('./spawnPromise');

module.exports = (dest) => spawn(
  'node_modules/.bin/webpack',
  [
    '--progress',
    '--display-error-details',
    '--config=webpack/webpack.config.js',
  ],
  { cwd: dest, stdio: 'inherit' }
);
