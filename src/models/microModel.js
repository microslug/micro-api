/********************************************************************************
 *
 * Models
 * Simple DB Schema
 * --slug
 * --destination
 ********************************************************************************/


import { db, dbConnected } from './initDB';
import { generateSlug } from './slugCreator';
import { logger } from '../utils/logger';
import { getDestinationUrl } from './getDestinationUrl';
import { getDataBaseSize } from './getDataBaseSize';



export const writeNewUrl = (url) => {
  if (!dbConnected) return Promise.reject(false);
  logger.info('writeNewUrl: Writing '+url);
  return new Promise( (resolve,reject) => {
    generateSlug(db,url)
      .then((slug) =>{
        logger.info('generateSlug: Got new slug '+slug);
        const reply = {
          microURL: `${process.env.MICRO_URL}/${slug}`,
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
      // Url bad
      .catch((url) => {
        logger.error('  Model: getUrlFromSlug: url='+url);
        url = 'bad';
        resolve(url);
      });
  });
};

export const getSize = () => {
  if (!dbConnected) return Promise.reject(false);
  logger.info('  Model: getSize:');

  return new Promise( (resolve,reject) => {
    console.log('ok')
    getDataBaseSize(db)
      .then((status) =>{
        logger.info('  Model: getSize: status='+status);
        resolve (status);
      })
      .catch((status) => {
        logger.error('  Model: getSize: status='+status);
        resolve(status);
      });
  });
};
