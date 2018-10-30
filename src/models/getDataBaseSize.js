import { logger } from '../utils/logger';
/********************************************************************************
 *
 * Get destination URL
 *
 ********************************************************************************/

export const getDataBaseSize = (db) => {
  logger.info('    SubModel: getDataBaseSize:');
  return new Promise( (resolve,reject) => {
    db.get('slugCounter').then ( (reply,error) => {
      if (error) {
        logger.error(error);
        reject(error);
      }
      logger.log('info','getDataBaseSize = '+reply);
      resolve(reply);

    });
  });
};
