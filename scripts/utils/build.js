const spawn = require('./spawnPromise');

module.exports = (dest, command = 'dev') => spawn(
  'npm',
  ['run', command, '--silent', '--', '--hide-modules'],
  { cwd: dest, stdio: 'inherit' }
);
