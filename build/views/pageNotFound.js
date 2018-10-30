'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPageNotFound = undefined;

var _logger = require('../utils/logger');

var renderPageNotFound = exports.renderPageNotFound = function renderPageNotFound(slug) {
  _logger.logger.info('rendering page not found for slug ' + slug);
  return 'Page not found. Slug ' + slug + ' does not exists in our system.';
}; // 404 page
//# sourceMappingURL=pageNotFound.js.map