const fs = require('fs');
const { assets } = require('./paths');


const files = fs.readdirSync(assets);
let apps = files.filter((file) => /-app$/.test(file));

if (files.includes('common')) {
  apps = ['common'].concat(apps);
}

module.exports = apps;
