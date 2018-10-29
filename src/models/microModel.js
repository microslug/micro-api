/********************************************************************************
 *
 * Models
 * our Schema
 * --slug
 * --destination
 ********************************************************************************/


import { db, dbConnected } from './initDB';
import { generateSlug } from './slugCreator';
import { logger } from '../utils/logger';
import { getDestinationUrl } from './getDestinationUrl';




export const writeNewUrl = (url) => {
  if (!dbConnected) return Promise.reject(false);
  logger.info('writeNewUrl: Writing '+url);
  return new Promise( (resolve,reject) => {
    generateSlug(db,url)
      .then((slug) =>{
        logger.info('generateSlug: Got new slug '+slug);
        const reply = {
          microURL: `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}/${slug}`,
          destinationURL: url,
          slug,
          write: 'ok'
        };
        resolve (reply);
      })
      .catch((reply) => {
        logger.info('generateSlug: unable to write slug '+reply);
        reject ('writeNewUrl: fail ',reply);
      });
  });
};

// Always returns a URL!!
export const getUrlFromSlug = (slug) => {
  //console.log('getUrlFromSlug, Database size: ',dbKeySize);
  logger.info('  Model: getUrlFromSlug: slug ='+slug);
  if (!dbConnected) return Promise.reject(false);
  return new Promise( (resolve,reject) => {
    const url = getDestinationUrl(db,slug)
      .then((url) =>{
        logger.info('  Model: getUrlFromSlug: url='+url);
        resolve (url);
      })
      // FIX this!!
      .catch((url) => {
        logger.error('  Model: getUrlFromSlug: url='+url);
        url = 'bad';
        resolve(url);
      });
  });
};
