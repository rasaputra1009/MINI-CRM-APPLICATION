const ncp = require('ncp');

module.exports = (src, dest) => new Promise((res, rej) => {
  ncp(src, dest, (err) => err ? rej(err) : res());
});
