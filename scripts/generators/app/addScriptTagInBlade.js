const path = require('path');
const fs = require('fs');
const { publicPath, defaultBuildPath, phpModulesPath } = require('../../utils/paths');


module.exports = function addScriptTagInBlade(phpModuleName, appName) {
  if (!/-app$/.test(appName)) {
    // eslint-disable-next-line no-param-reassign
    appName = `${appName}-app`;
  }
  const vendorTag = `<script src="{{normalize_chunks('/${path.relative(publicPath, defaultBuildPath)}/${appName}/vendors~main.chunk.js')}}"></script>`;

  const scriptTag = `<script src="{{normalize_chunks('/${path.relative(publicPath, defaultBuildPath)}/${appName}/main.js')}}"></script>`;
  const rootTag = '<div id=\'app\'></div>';
  const bladeFile = path.resolve(phpModulesPath, phpModuleName, 'Views/index.blade.php');

  fs.readFile(bladeFile, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.toString().split('\n');
    const closingBodyTagIndex = lines.findIndex((line) => /<\/body>/.test(line));
    const linesWithScriptTag = [
      ...lines.slice(0, closingBodyTagIndex),
      rootTag,
      vendorTag,
      scriptTag,
      ...lines.slice(closingBodyTagIndex),
    ];

    fs.writeFile(bladeFile, linesWithScriptTag.join('\n'), (error) => error && console.error(error));
  });
};
