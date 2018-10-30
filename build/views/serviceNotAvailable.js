'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderServiceNotAvailable = undefined;

var _logger = require('../utils/logger');

var renderServiceNotAvailable = exports.renderServiceNotAvailable = function renderServiceNotAvailable() {
  _logger.logger.info('Data is down. ');
  return 'Service temporary not available. Unable to connect to database.';
}; // 503 page
//# sourceMappingURL=serviceNotAvailable.js.map