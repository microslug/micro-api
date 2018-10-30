'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookupDestination = exports.testPage = exports.redirectSlugToUrl = exports.addNewURL = exports.apiHelp = undefined;

var _microModel = require('../models/microModel');

var _apiDescription = require('../docs/apiDescription');

var _logger = require('../utils/logger');

var _pageNotFound = require('../views/pageNotFound');

var _renderTestPage = require('../views/renderTestPage');

var _serviceNotAvailable = require('../views/serviceNotAvailable');

// import redis
var apiHelp = exports.apiHelp = function apiHelp(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(_apiDescription.apiDescription);
};

var addNewURL = exports.addNewURL = function addNewURL(req, res) {
  // check req.body.url
  // validation for missing or incorrect url
  if (!req.body.url) {
    _logger.logger.error('addNewUrl: missing destination url');
    res.json({ error: 'Missing key "url" with destination url' });
    return;
  }
  if (req.body.url.indexOf(process.env.HOST) > -1) {
    _logger.logger.error('addNewUrl: Destination url cannot be this service!');
    res.json({ error: 'Destination url cannot be this service!' });
    return;
  }
  (0, _microModel.writeNewUrl)(req.body.url).then(function (result) {
    _logger.logger.log('info', 'writeNewUrl: result = ', result);
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  }, function (error) {
    _logger.logger.error('writeNewUrl: ', error);
    if (!error) {
      res.setHeader('Content-Type', 'application/json');
      res.json({ error: 'Database not available.' });
    }
  });
};

var redirectSlugToUrl = exports.redirectSlugToUrl = function redirectSlugToUrl(req, res) {
  _logger.logger.info('Controller: redirectSlugToUrl: slug = ' + req.params.slug);
  var url = (0, _microModel.getUrlFromSlug)(req.params.slug).then(function (url) {
    _logger.logger.info('Controller: redirectSlugToUrl: url = ' + url);
    if (url) {
      res.redirect(301, url);
    } else {
      res.status(404).end((0, _pageNotFound.renderPageNotFound)(req.params.slug));
    }
  }, function (error) {
    _logger.logger.error('redirectSlugToUrl: ', error);
    if (error) {
      res.status(503).end((0, _serviceNotAvailable.renderServiceNotAvailable)());
    }
  });
};

// export const status = (req, res) => {
//   getStatus()
//     .then ((result) => {
//       logger.log('info','getStatus: result = ',result);
//       res.setHeader('Content-Type', 'application/json');
//       res.json(result);
//     }, (error) => {
//       logger.error('Status: ',error);
//       if (error) {
//         res.setHeader('Content-Type', 'application/json');
//         res.json({error: 'Database not available.'});
//       }
//     }
//     );
// };

var testPage = exports.testPage = function testPage(req, res) {
  res.end((0, _renderTestPage.renderTestPage)());
};

var lookupDestination = exports.lookupDestination = function lookupDestination(req, res) {
  var DBresponse = 'fake response from DB';
  res.json(DBresponse);
};
//# sourceMappingURL=microController.js.map