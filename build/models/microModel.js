'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSize = exports.getUrlFromSlug = exports.writeNewUrl = undefined;

var _initDB = require('./initDB');

var _slugCreator = require('./slugCreator');

var _logger = require('../utils/logger');

var _getDestinationUrl = require('./getDestinationUrl');

var _getDataBaseSize = require('./getDataBaseSize');

var writeNewUrl = exports.writeNewUrl = function writeNewUrl(url) {
  if (!_initDB.dbConnected) return Promise.reject(false);
  _logger.logger.info('writeNewUrl: Writing ' + url);
  return new Promise(function (resolve, reject) {
    (0, _slugCreator.generateSlug)(_initDB.db, url).then(function (slug) {
      _logger.logger.info('generateSlug: Got new slug ' + slug);
      var reply = {
        microURL: process.env.MICRO_URL + '/' + slug,
        destinationURL: url,
        slug: slug,
        write: 'ok'
      };
      resolve(reply);
    }).catch(function (reply) {
      _logger.logger.info('generateSlug: unable to write slug ' + reply);
      reject('writeNewUrl: fail ', reply);
    });
  });
};

// Always returns a URL!!
/********************************************************************************
 *
 * Models
 * Simple DB Schema
 * --slug
 * --destination
 ********************************************************************************/

var getUrlFromSlug = exports.getUrlFromSlug = function getUrlFromSlug(slug) {
  //console.log('getUrlFromSlug, Database size: ',dbKeySize);
  _logger.logger.info('  Model: getUrlFromSlug: slug =' + slug);
  if (!_initDB.dbConnected) return Promise.reject(false);
  return new Promise(function (resolve, reject) {
    var url = (0, _getDestinationUrl.getDestinationUrl)(_initDB.db, slug).then(function (url) {
      _logger.logger.info('  Model: getUrlFromSlug: url=' + url);
      resolve(url);
    })
    // Url bad
    .catch(function (url) {
      _logger.logger.error('  Model: getUrlFromSlug: url=' + url);
      url = 'bad';
      resolve(url);
    });
  });
};

var getSize = exports.getSize = function getSize() {
  if (!_initDB.dbConnected) return Promise.reject(false);
  _logger.logger.info('  Model: getSize:');

  return new Promise(function (resolve, reject) {
    console.log('ok');
    (0, _getDataBaseSize.getDataBaseSize)(_initDB.db).then(function (status) {
      _logger.logger.info('  Model: getSize: status=' + status);
      resolve(status);
    }).catch(function (status) {
      _logger.logger.error('  Model: getSize: status=' + status);
      resolve(status);
    });
  });
};
//# sourceMappingURL=microModel.js.map