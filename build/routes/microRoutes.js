'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microController = require('../controllers/microController');

var _logger = require('../utils/logger');

// available routes
// / = api info
// /d3djej  = redirection to actual URL
// /v1/shrink   = shorten url (body contains encoded long URL)
// /v1/lookup/de3df3 = lookup slug

// extract this into env vars
var APIVERSION = 'v1';
var SHRINKAPI = 'shrink';
var LOOKUPAPI = 'lookup';
var SIZEAPI = 'size';

var routes = function routes(app) {
  // Documentation page
  app.route('/').get(_microController.apiHelp);
  // URL micronizer route
  app.route('/:slug([0-9a-zA-Z]{6,7})').get(_microController.redirectSlugToUrl);

  // generate new micro address
  app.route('/' + APIVERSION + '/' + SHRINKAPI).post(_microController.addNewURL);

  app.route('/' + APIVERSION + '/' + LOOKUPAPI + '/:slug').get(_microController.lookupDestination)
  // UPDATE URL here
  .put(function (req, res) {
    return res.status(501).send('Not implemented.');
  })
  // DELETE URL??
  .delete(function (req, res) {
    return res.status(501).send('Not implemented.');
  });
  // future version
  app.route('/' + APIVERSION + '/' + SIZEAPI).get(_microController.size);
  // for testing
  app.route('/v1/makeslug/:counter').get(_microController.makeSlug);

  app.route('/testPage').get(_microController.testPage);

  app.route('*').get(function (req, res) {
    return res.status(404).send('Invalid URL. See documentation <a href="/">here.</a>');
  });

  _logger.logger.log('info', 'Routes registered.');
};

exports.default = routes;
//# sourceMappingURL=microRoutes.js.map