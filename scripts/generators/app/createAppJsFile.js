const fs = require('fs');
const path = require('path');

module.exports = function createAppJsFile({ dest, appName }) {
  const src = path.resolve(__dirname, '../stubs/app.js.stub');
  const nameWithoutSuffix = appName.replace(/-app$/, '');
  return new Promise((res, rej) => {
    fs.readFile(src, (err, template) => {
      if (err) {
        rej(err);
        return;
      }

      const data = template
        .toString()
        .replace(/#{APP_NAME}/g, nameWithoutSuffix);

      fs.writeFile(path.join(dest, 'app/app.js'), data, error =>
        error ? rej(error) : res(),
      );
    });
  });
};
