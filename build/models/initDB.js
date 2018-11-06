'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.dbKeySize = exports.dbConnected = undefined;

var _logger = require('../utils/logger');

require('dotenv').config(); /********************************************************************************
                             *
                             * Initialize Redis DB
                             *
                             ********************************************************************************/

var promiseFactory = require('when').promise,
    redis = require('promise-redis')(promiseFactory);

var client = void 0;

if (process.env.REDISTOGO_URL) {
  // heroku
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = redis.createClient({
    host: rtg.hostname,
    port: rtg.port
  });
  client.auth(rtg.auth.split(':')[1]);
} else if (process.env.K8SPASSWORD) {
  // kubernetes
  console.log('got K8S');
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.K8SPASSWORD
  });
} else {
  // local
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  });
}

var dbConnected = exports.dbConnected = false;

client.on('connect', function () {
  exports.dbConnected = dbConnected = true;
  _logger.logger.log('info', 'Redis client connected.');
});
client.on('error', function (err) {
  exports.dbConnected = dbConnected = false;
  _logger.logger.error('Unable to connect to DB ', err);
});

client.get('slugCounter').then(function (reply, error) {
  if (error) {
    return console.log('Error: ', err.message);
  }
  _logger.logger.log('info', 'Database key size = ' + reply);
});

var dbKeySize = exports.dbKeySize = null;

client.send_command('dbsize').then(function (reply, error) {
  if (error) {
    return console.log('Error: ', err.message);
  }
  exports.dbKeySize = dbKeySize = reply;
});
var db = exports.db = client;
//# sourceMappingURL=initDB.js.map