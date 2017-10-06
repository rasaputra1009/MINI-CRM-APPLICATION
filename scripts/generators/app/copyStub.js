const ncp = require('ncp');
const path = require('path');
const { promisify } = require('util');


module.exports = ({ stub, name, path: dest }) => {
  const stubPath = path.resolve(__dirname, '../stubs', stub);

  return promisify(ncp)(stubPath, path.resolve(dest, name));
};
