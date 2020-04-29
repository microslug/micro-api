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

var _shell = require('./utils/shell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config(); // entry point for mic.ro using using ES2015 syntax


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

var getIp = function getIp() {
  // get public ip
  _logger.logger.info('Getting service public IP...');
  var cmd = 'kubectl get service micro-api-deployment -o json | jq -r \'.status.loadBalancer.ingress[0].ip\' | xargs | tr -d "\n" | tr -d "\r"';
  var isValidIP = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
  (0, _shell.shell)(cmd).then(function (ret) {
    if (isValidIP.test(ret)) {
      process.env.MICRO_URL = 'http://' + ret;
      _logger.logger.info('Setting env.MICRO_URL=' + process.env.MICRO_URL);
    } else {
      setTimeout(function () {
        return getIp();
      }, 5000);
    }
  }).catch(function (err) {
    return console.log('Command error ', err);
  });
};

//Launch server
app.listen(process.env.PORT, function () {
  _logger.logger.log('info', 'Mic.ro slug API serice has started and listening on port ' + process.env.PORT);

  getIp();
});

exports.default = app;
//# sourceMappingURL=index.js.map