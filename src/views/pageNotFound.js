// 404 page
import { logger } from '../utils/logger';

export const renderPageNotFound = (slug) => {
  logger.info('rendering page not found for slug '+slug);
  return `Page not found. Slug ${slug} does not exists in our system.`;
};
