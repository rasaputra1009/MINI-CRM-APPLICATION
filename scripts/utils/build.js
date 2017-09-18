const spawn = require('./spawnPromise');

module.exports = (dest, command = 'dev') => spawn(
  'npm',
  ['run', command],
  { cwd: dest, stdio: 'inherit' }
);
