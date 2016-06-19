var webpack = require('webpack');

module.exports = {
  entry: {
    entry1: './src/index.js'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {presets:['react','es2015']}
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};
