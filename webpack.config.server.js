var path = require('path');
var ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  entry: './server/index.js',
  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, '/dist'),
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'babel-plugin-webpack-loaders', {
                  config: './webpack.config.babel.js',
                  verbose: false,
                },
              ],
            ],
          },
        },
      },
    ]
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, 'node_modules'),
    })
  ]
}