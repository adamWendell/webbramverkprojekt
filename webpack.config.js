
const path = require('path')

module.exports = {
  context: __dirname,
  entry: './app/main.js',
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
