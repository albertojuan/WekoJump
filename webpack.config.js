var path = require('path');

module.exports = {
  entry: ['babel-regenerator-runtime','./game/init.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'game'),
        loader: 'babel-loader'
      }
    ]
  }
};