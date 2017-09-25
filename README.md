# Laravel React Boilerplate

A boilerplate with laravel modules and multiple react-apps

## Requirements
 - PHP >= 7.0
 - node >= 8
 - yarn
 
## Setup
 - Clone the project
 `git clone --depth=1 git@tree.mn:rohan.ka/laravel-react-boilerplate.git [<dirname>]`
 - Install node modules, run `yarn`
 - Run `composer install` at the root
 - create a `.env` file
 - Run `php artisan key:generate` to generate the app key for laravel.
 
## Directory Structure

### Php
For the laravel's directory structure refer to [module installer](http://tree.mn/cm-admin/module-installer)

### React
All the js/sass source code is located at `resources/src`.  
This directory contains multiple app folders,
each of which is an independent react app. **Each app directory must end with `-app`**  
There is also a `common` directory located at `resources/src` which has modules that can be shared across multiple apps.  
Inside each app there is a `components` and a `containers` directory.
For more details of the structure of each app refer [here](https://github.com/react-boilerplate/react-boilerplate)


  
## Build
  - Each app has its own independent webpack config at `<app-dir>/webpack.config.js` which extends from a common webpack config at `webpack/index`
  - The app webpack can pass a set of conifg objects in case it wants to add, override or merge some properties. Defaults are assumed for most properties.
  - Modules have three build scripts `dev`, `prod` and `hot` &mdash; which can be run using `npm run <script>` or `yarn script`. See the scripts section for more details.
  - After build, for each app the generated files are placed in `public/build/<app-name>`. (See changing webpack config on how to override behavior)

## Scripts

### Root scripts  
  
| Name | Description| Args |
|------|------------| --------- |
| `generate:app` | Creates a new app, loads the yarn module for the app, then builds it (using `dev` build). | |
| `generate` | Creates a new React component or container for an app | |
| `dev`| Runs the dev build for each app including `common` | Passes args to webpack |
| `prod`| Runs the prod build for each app including `common` | Passes args to webpack |
| `load` | Runs yarn for every module | |
| `composer` | Downloads composer if it doesn't exist and runs `composer install`| Passes args to `composer install` |
| `clean:all` | Deletes the build directory (`public/build` by default). Runs before each `dev` and `prod` builds | | |


### App scripts (resources/src/<app>)

| Name | Description| Args |
|------|------------| --------- |
| `dev` | Generates unminified code with inline source maps | Passes args to webpack build |
| `watch` | Same as `dev` but watches files for changes | Passes args to webpack build |
| `prod`| Generates minified code with extracted css | Passes args to webpack |
| `hot` | Runs webpack-dev-server. Enables hot reloading | Passes args to webpack dev server. e.g. `yarn run hot -- --port=2000` will run webpack dev server at port 2000 |
| `clean` | Deletes the build directory (`public/build/<app-name>` by default). Runs before each `hot`, `dev` and `prod` builds | | |

## Changing webpack config

To override default config, just pass relevant parameters to the `baseConfig` method in the app's webpack.config.js.  
Available parameters are &mdash;
 -  `appName`: (String) The name of the app. This determines the build path. Defaults to the directory name
 -  `buildPath`: (String) The path where the output will be generated. The default is `public/build/<appName>`. If both buildPath and appName are given, appName is ignored.
 - `loaders`: (Function) A function that returns loaders. To see the loaders present by default, check `webpack/loaders.js`. The following params are passed to it  
   * buildPath (See `buildPath` above)
   * isProduction: (Boolean) true if the NODE_ENV is 'production'
   * isHot: (Boolean) true if the hot reloading is currently enabled for the app
   * port: (Number) In case of hot reloading, the port at which webpack-dev-server is running
 - `plugins`: (Function) A function that returns plugins. To see the loaders present by default, check `webpack/loaders.js`. The params passed to it are the same as for loaders.
 - `overrideLoaders`: (Boolean) If false, then the loader specified in the app config are merged with the default loaders. Otherwise the default loaders are removed.
 - `overridePlugins`: (Boolean) If false, then the plugin specified in the app config are merged with the default plugins. Otherwise the default plugins are removed.
 - `optionsConfig`: (Object) All entries in the optionsConfig are added to the webpack config directly.
 
