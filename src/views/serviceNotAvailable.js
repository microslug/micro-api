// 503 page
import { logger } from '../utils/logger';

export const renderServiceNotAvailable = () => {
  logger.info('Data is down. ');
  return 'Service temporary not available. Unable to connect to database.';
};
