var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client : './src/client.js'
  },
  output: {
    path: 'dist',
    filename: '[hash]/js/[name].js'
  },
  resolve: {
    
  },
  module: {
    loaders: [{
      test: /\.js(x)?$/,
      loader: 'babel-loader',
      exclude: function (path) {
        return (!!path.match(/node_modules/));
      },
      query: {
        presets:['react','es2015']
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['css'])
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(['css', 'less'])
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SpringHack',
      inject: true,
      minify: {
        removeComments: true,
	collapseWhitespace: false
      }
    }),
    new ExtractTextPlugin("[hash]/css/[name].css")
  ]
};
