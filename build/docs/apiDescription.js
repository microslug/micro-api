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
      route: '/[slug]',
      method: 'get',
      example: '/Jod7G0'
    }, {
      description: 'Returns the number of slugs in database.',
      route: '/v1/size',
      method: 'get',
      example: '/v1/size',
      returns: {
        "NumberOfSlugs": "3"
      }
    }, {
      description: 'Returns saved URL per given slug',
      route: '/v1/lookup/[slug]',
      method: 'get',
      example: '/v1/lookup/Jod7G0',
      returns: {
        "url": "http%3A%2F%2Fwww.startpage.com"
      }
    }, {
      description: 'Little helper to translate counter to slugs',
      route: '/v1/makeslug/[number]',
      method: 'get',
      example: '/v1/makeslug/42',
      returns: {
        "slug": "mmHaRF"
      }
    }, { route: '/v1/shrink',
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