var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        loader: ExtractTextPlugin.extract('style-loader','css-loader')        
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};