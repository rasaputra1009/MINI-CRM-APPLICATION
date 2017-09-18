const { isProduction } = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const commonLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.(eot|ttf|woff2?)/,
    use: 'file-loader',
  },
  {
    test: /\.svg/,
    use: 'svg-loader',
  },
];

module.exports = () => {
  let styleLoaders = [
    {
      test: /\.s[ca]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ];

  if (isProduction) {
    styleLoaders = [
      {
        test: /\.s[ca]ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ];
  }

  return [...commonLoaders, ...styleLoaders];
};
