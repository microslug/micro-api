import { logger } from '../utils/logger';
/********************************************************************************
 *
 * Get destination URL
 *
 ********************************************************************************/

export const getDestinationUrl = (db,slug) => {
  logger.info('    SubModel: getDestinationUrl: slug = '+slug);
  return new Promise( (resolve,reject) => {
    db.get(slug).then ( (url,error) => {
      if (error) {
        reject(error);
      }
      url = !url ? url : decodeURIComponent(url);
      logger.info('    SubModel: getDestinationUrl: url ='+url);
      // update timeout if slug found
      if (url) {
        db.set(slug,url,'EX', process.env.SLUG_EXPIRY).then ( (status,error) => {
          if (error) {
            return logger.error(err);
          }
          logger.info('      SubModel: slug expiry reset  '+process.env.SLUG_EXPIRY);
        });
      }
      resolve(url);
    })
  });
};
