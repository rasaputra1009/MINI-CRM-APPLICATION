const spawnPromise = require('./spawnPromise');

module.exports = (path = '.') => spawnPromise('yarn', { stdio: 'inherit', cwd: path });
