/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderPage = __webpack_require__(3);

var path = __webpack_require__(0);
var express = __webpack_require__(4);

var app = express();

var devMode = process.env.NODE_ENV === 'development';

if (devMode) {
  var webpack = __webpack_require__(1);
  var config = __webpack_require__(5);
  var webpackDevMiddleware = __webpack_require__(6);
  var webpackHotMiddleware = __webpack_require__(7);
  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname, '../static')));
app.use(express.static(path.resolve(__dirname, '../dist/client')));

app.get('/', function (req, res) {
  res.send((0, _renderPage.renderPage)());
});

var server = __webpack_require__(8).createServer(app);
var io = __webpack_require__(9)(server);

var connectedUsers = {};

io.on('connection', function (socket) {

  var updateUsers = function updateUsers() {
    io.sockets.emit('users', connectedUsers);
  };

  socket.on('new user', function (username) {
    connectedUsers[socket.id] = {
      username: username
    };
    socket.join(username);
    updateUsers();
  });

  socket.on('message', function (data) {
    io.in(data.receiver).in(data.sender).emit('message', data);
  });

  socket.on('disconnect', function () {
    delete connectedUsers[socket.id];
    updateUsers();
  });
});

server.listen(process.env.PORT || 8080, function () {
  return console.log("Listening on port 8080!");
});

exports.default = server;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isProdMode = process.env.NODE_ENV === 'production';
var assets = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);

var renderPage = exports.renderPage = function renderPage() {
  return '\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n    ' + (isProdMode ? '<link rel=\'stylesheet\' href=\'' + assets['main.css'] + '\' />' : '') + '\n    <title>React Social Network</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="' + (isProdMode ? assets['main.js'] : '/main.js') + '"></script>\n    </body>\n  </html>\n';
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var webpack = __webpack_require__(1);
var path = __webpack_require__(0);

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client', './client/index.js'],
  output: {
    filename: 'main.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: 'babel-loader'
    }, {
      test: /\.s?css$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(true),
      'NODE_ENV': JSON.stringify('development')
    }
  })]
};
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })
/******/ ]);