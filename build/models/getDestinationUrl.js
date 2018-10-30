'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDestinationUrl = undefined;

var _logger = require('../utils/logger');

/********************************************************************************
 *
 * Get destination URL
 *
 ********************************************************************************/

var getDestinationUrl = exports.getDestinationUrl = function getDestinationUrl(db, slug) {
  _logger.logger.info('    SubModel: getDestinationUrl: slug = ' + slug);
  return new Promise(function (resolve, reject) {
    db.get(slug).then(function (url, error) {
      if (error) {
        reject(error);
      }
      url = !url ? url : decodeURIComponent(url);
      _logger.logger.info('    SubModel: getDestinationUrl: url =' + url);
      // update timeout if slug found
      if (url) {
        db.set(slug, url, 'EX', process.env.SLUG_EXPIRY).then(function (status, error) {
          if (error) {
            return _logger.logger.error(err);
          }
          _logger.logger.info('      SubModel: slug expiry reset  ' + process.env.SLUG_EXPIRY);
        });
      }
      resolve(url);
    });
  });
};
//# sourceMappingURL=getDestinationUrl.js.map