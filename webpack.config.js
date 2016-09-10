var path = require('path');

module.exports = {
  context: path.resolve('src'),
  entry: './app',
  output: {
    path: path.resolve('public/'),
    publicPath: '/public/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.es6']
  },
  devServer: {
    contentBase: 'public'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!',
        exclude: /node_modules/
      }
    ]
  }
};