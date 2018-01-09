const fs = require('fs');
const { assets } = require('./paths');


const files = fs.readdirSync(assets);
const isApp = (file) => /-app$/.test(file);

const apps = ['commons'].concat(files.filter(isApp));

module.exports = apps;
