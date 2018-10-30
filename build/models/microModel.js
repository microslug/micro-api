'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlFromSlug = exports.writeNewUrl = undefined;

var _initDB = require('./initDB');

var _slugCreator = require('./slugCreator');

var _logger = require('../utils/logger');

var _getDestinationUrl = require('./getDestinationUrl');

// import { getDatabaseSize } from './getDatabaseSize';


/********************************************************************************
 *
 * Models
 * Simple DB Schema
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

// export const getStatus = () => {
//   //console.log('getUrlFromSlug, Database size: ',dbKeySize);
//   logger.info('  Model: getStatus:',dbConnected);
//   if (!dbConnected) return Promise.reject(false);
//   logger.info('  Model: getStatus: HERE',dbConnected);
//
//   return new Promise( (resolve,reject) => {
//     console.log('ok')
//     const status = getDatabaseSize(db)
//       .then((status) =>{
//         logger.info('  Model: getStatus: status='+status);
//         resolve (status);
//       })
//       .catch((status) => {
//         logger.error('  Model: getStatus: status='+status);
//         resolve(status);
//       });
//   });
// };
//# sourceMappingURL=microModel.js.map