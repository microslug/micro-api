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
// import { getDatabaseSize } from './getDatabaseSize';



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
