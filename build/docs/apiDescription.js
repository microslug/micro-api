'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DOMAIN = 'MIC.RO';

var apiDescription = exports.apiDescription = {
  'api': [{ version: 'v1',
    routes: [{ description: 'This page',
      route: '/',
      method: 'get',
      example: '/'
    }, {
      description: 'Mic.ro redirection service that will redirect to saved URL',
      route: '/slug',
      method: 'get',
      example: '/JodK7G0'
    }, { route: '/shrink',
      description: 'Accepts url-encoded string that is stored in a database then returns the shortened version',
      method: 'post',
      example: '/shrink',
      body: '{ url: "http%3A%2F%2Fwww.startpage.com"}',
      returns: {
        slug: 'JodK7G0',
        microUrl: '\'http://' + DOMAIN + '/JodK7G0\''
      }
    }]
  }]
};
//# sourceMappingURL=apiDescription.js.map