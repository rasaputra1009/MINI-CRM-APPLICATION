const fs = require('fs');

module.exports = function checkIfAppExists(dest) {
  try {
    const files = fs.readdirSync(dest);
    if (files && files.length > 0) {
      return true;
    }
  } catch (error) {
    return error.code !== 'ENOENT';
  }

  return false;
};
