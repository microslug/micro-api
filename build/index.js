'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _microRoutes = require('./routes/microRoutes');

var _microRoutes2 = _interopRequireDefault(_microRoutes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _logger = require('./utils/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// entry point for mic.ro using using ES2015 syntax
require('dotenv').config();

var app = (0, _express2.default)();
// bodyparser setup
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

(0, _microRoutes2.default)(app);

//Launch server
app.listen(process.env.PORT, function () {
  _logger.logger.log('info', 'Mic.ro slug API serice has started and listening on port ' + process.env.PORT);
});

exports.default = app;
//# sourceMappingURL=index.js.map