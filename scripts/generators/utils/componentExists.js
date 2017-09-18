/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const { assets } = require('../../utils/paths.js');


function componentExists(appName, component) {
  const pageComponents = fs.readdirSync(path.resolve(assets, appName, 'app', 'components'));
  const pageContainers = fs.readdirSync(path.resolve(assets, appName, 'app', 'containers'));
  const components = pageComponents.concat(pageContainers);
  return components.includes(component);
}

module.exports = componentExists;
