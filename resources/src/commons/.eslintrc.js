module.exports = {
  extends: ['../../../.eslintrc.js'],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack.config.js"
      }
    }
  }
}
