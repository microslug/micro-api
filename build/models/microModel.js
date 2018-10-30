'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlFromSlug = exports.writeNewUrl = undefined;

var _initDB = require('./initDB');

var _slugCreator = require('./slugCreator');

var _logger = require('../utils/logger');

var _getDestinationUrl = require('./getDestinationUrl');

/********************************************************************************
 *
 * Models
 * our Schema
 * --slug
 * --destination
 ********************************************************************************/

var writeNewUrl = exports.writeNewUrl = function writeNewUrl(url) {
  if (!_initDB.dbConnected) return Promise.reject(false);
  _logger.logger.info('writeNewUrl: Writing ' + url);
  return new Promise(function (resolve, reject) {
    (0, _slugCreator.generateSlug)(_initDB.db, url).then(function (slug) {
      _logger.logger.info('generateSlug: Got new slug ' + slug);
      var reply = {
        microURL: '' + process.env.PROTOCOL + process.env.HOST + ':' + process.env.PORT + '/' + slug,
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
var getUrlFromSlug = exports.getUrlFromSlug = function getUrlFromSlug(slug) {
  //console.log('getUrlFromSlug, Database size: ',dbKeySize);
  _logger.logger.info('  Model: getUrlFromSlug: slug =' + slug);
  if (!_initDB.dbConnected) return Promise.reject(false);
  return new Promise(function (resolve, reject) {
    var url = (0, _getDestinationUrl.getDestinationUrl)(_initDB.db, slug).then(function (url) {
      _logger.logger.info('  Model: getUrlFromSlug: url=' + url);
      resolve(url);
    })
    // FIX this!!
    .catch(function (url) {
      _logger.logger.error('  Model: getUrlFromSlug: url=' + url);
      url = 'bad';
      resolve(url);
    });
  });
};
//# sourceMappingURL=microModel.js.map