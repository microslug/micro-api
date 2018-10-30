'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataBaseSize = undefined;

var _logger = require('../utils/logger');

/********************************************************************************
 *
 * Get destination URL
 *
 ********************************************************************************/

var getDataBaseSize = exports.getDataBaseSize = function getDataBaseSize(db) {
  _logger.logger.info('    SubModel: getDataBaseSize:');
  return new Promise(function (resolve, reject) {
    db.get('slugCounter').then(function (reply, error) {
      if (error) {
        _logger.logger.error(error);
        reject(error);
      }
      _logger.logger.log('info', 'getDataBaseSize = ' + reply);
      resolve(reply);
    });
  });
};
//# sourceMappingURL=getDataBaseSize.js.map