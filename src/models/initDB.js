/********************************************************************************
 *
 * Initialize Redis DB
 *
 ********************************************************************************/

import { logger } from '../utils/logger';

var promiseFactory = require('when').promise,
  redis = require('promise-redis')(promiseFactory);

let client;

if (process.env.REDISTOGO_URL) {
  // heroku
  const rtg = require('url').parse(process.env.REDISTOGO_URL);
  client = redis.createClient({
    host: rtg.hostname,
    port: rtg.port,
  });
  client.auth(rtg.auth.split(':')[1]);
} else {
  // local
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
}

export let dbConnected = false;

client.on('connect', () => {
  dbConnected = true;
  logger.log('info','Redis client connected.');
});
client.on('error', (err) => {
  dbConnected = false;
  logger.error('Unable to connect to DB ',err);
});


client.get('slugCounter').then ( (reply,error) => {
  if (error) {
    return console.log('Error: ', err.message);
  }
  logger.log('info','Database key size = '+reply);
});

export let dbKeySize = null;


client.send_command( 'dbsize').then ( (reply,error) => {
  if (error) {
    return console.log('Error: ', err.message);
  }
  dbKeySize = reply;
});
export const db = client;
