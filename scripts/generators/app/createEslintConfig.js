const cp = require('../../utils/cp');
const path = require('path');

const src = path.resolve(__dirname, '../stubs/eslint.stub');


module.exports = (dest) => cp(src, path.resolve(dest, '.eslintrc.js'));
