
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'main.[chunkhash].js',
    path: path.join(__dirname, '/dist/client'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {loader: "sass-loader"}
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new ExtractTextPlugin({
      filename: 'main.[chunkhash].css'
    }),
    new ManifestPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}