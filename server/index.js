const path = require('path');
const express = require("express");

const app = express();

import { renderPage } from './renderPage';

const devMode = process.env.NODE_ENV === 'development';

if (devMode) {
  const webpack = require("webpack");
  const config = require("../webpack.config.dev");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname, '../static')));
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.get('/', (req, res) => {
  res.send(renderPage());
});

app.listen(process.env.PORT || 8080, () => console.log("Listening on port 8080!"));

export default app;