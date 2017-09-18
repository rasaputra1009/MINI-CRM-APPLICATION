const fs = require('fs');


module.exports = (path) => new Promise((res, rej) => {
  fs.readdir(path, (err, data) => {
    if (err) {
      rej(err);
      return;
    }

    res(data);
  });
});
