/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const { assets } = require('../../utils/paths.js');

function componentExists(appName, component) {
  let pageComponents = [];
  let pageContainers = [];
  try {
    pageComponents = fs.readdirSync(
      path.resolve(assets, appName, 'app', 'components'),
    );
  } catch (e) {
    // Do nothing
  }
  try {
    pageContainers = fs.readdirSync(
      path.resolve(assets, appName, 'app', 'containers'),
    );
  } catch (e) {
    // Do nothing
  }
  const components = pageComponents.concat(pageContainers);
  return components.includes(component);
}

module.exports = componentExists;
