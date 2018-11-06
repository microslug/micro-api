import { logger } from '../utils/logger';
/********************************************************************************
 *
 * Get destination URL
 *
 ********************************************************************************/

export const getDataBaseSize = (db) => {
  logger.info('    SubModel: getDataBaseSize:');
  return new Promise( (resolve,reject) => {
    db.get('slugCounter').then ( (size,error) => {
      if (error) {
        logger.error('    SubModel: getDataBaseSize:',error);
        reject(error);
      }
      logger.log('info','getDataBaseSize = '+size);
      resolve({'NumberOfSlugs': size});

    });
  });
};
