var webpack = require('webpack');

module.exports = {
  entry: {
    client : './src/client.js'
  },
  output: {
    path: './dist',
    filename: 'bundle.[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {presets:['react','es2015']}
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }]
  }
};
