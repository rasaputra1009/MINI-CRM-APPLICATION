const fs = require('fs');

module.exports = (src, dest) => new Promise((res, rej) => {
  try {
    const from = fs.createReadStream(src);
    const to = fs.createWriteStream(dest);

    from.pipe(to);
    to.on('finish', res);
  } catch (e) {
    rej(e);
  }
});
