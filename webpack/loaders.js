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
    test: /\.(eot|ttf|woff2?|jpe?g|png|gif)$/,
    use: 'file-loader',
  },
  {
    test: /\.svg$/,
    use: ['url-loader', 'svg-fill-loader'],
  },
  {
    test: /\.json$/,
    use: 'json-loader',
  }, {
    test: /\.html$/,
    use: 'html-loader',
  },
];

module.exports = ({ isProduction }, otherLoaders = []) => {
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
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
    ];
  }

  return [...commonLoaders, ...styleLoaders, ...otherLoaders];
};
