'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSlug = exports.lookupDestination = exports.testPage = exports.size = exports.redirectSlugToUrl = exports.addNewURL = exports.apiHelp = undefined;

var _microModel = require('../models/microModel');

var _apiDescription = require('../docs/apiDescription');

var _logger = require('../utils/logger');

var _pageNotFound = require('../views/pageNotFound');

var _renderTestPage = require('../views/renderTestPage');

var _serviceNotAvailable = require('../views/serviceNotAvailable');

var _slugCreator = require('../models/slugCreator');

var apiHelp = exports.apiHelp = function apiHelp(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.json(_apiDescription.apiDescription);
}; // import redis


var dbNotAvailResponse = function dbNotAvailResponse(res) {
  res.setHeader('Content-Type', 'application/json');
  res.json({ error: 'Database not available.' });
  return;
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
      dbNotAvailResponse(res);
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
    if (!error) {
      res.status(503).end((0, _serviceNotAvailable.renderServiceNotAvailable)());
    }
  });
};

var size = exports.size = function size(req, res) {
  _logger.logger.info('Controller: size: ');
  (0, _microModel.getSize)().then(function (result) {
    _logger.logger.log('info', 'getSize: result = ', result);
    res.setHeader('Content-Type', 'application/json');
    res.json(result);
  }, function (error) {
    _logger.logger.error('Controller: size:  ', error);
    if (!error) {
      dbNotAvailResponse(res);
    }
  });
};

var testPage = exports.testPage = function testPage(req, res) {
  res.end((0, _renderTestPage.renderTestPage)());
};

var lookupDestination = exports.lookupDestination = function lookupDestination(req, res) {
  _logger.logger.info('Controller: lookupDestination: ');
  if (req.params.slug) {
    (0, _microModel.getUrlFromSlug)(req.params.slug).then(function (url) {
      _logger.logger.info('Controller: lookupDestination: url = ' + url);
      if (url) {
        res.setHeader('Content-Type', 'application/json');
        res.json({ url: url });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'slug not found.' });
      }
    }, function (error) {
      _logger.logger.error('lookupDestination: ', error);
      if (!error) {
        dbNotAvailResponse(res);
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'Slug not provided' });
  }
};

var makeSlug = exports.makeSlug = function makeSlug(req, res) {
  if (req.params.counter) {
    var slug = (0, _slugCreator.counterToSlug)(req.params.counter);
    res.setHeader('Content-Type', 'application/json');
    res.json({ slug: slug });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'Counter not provided' });
  }
};
//# sourceMappingURL=microController.js.map