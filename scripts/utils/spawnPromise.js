const { spawn } = require('child_process');

module.exports = (...args) =>
  new Promise((res, rej) => {
    const proc = spawn(...args);
    proc.on('close', code => (code === 0 ? res(code) : rej()));
  });
