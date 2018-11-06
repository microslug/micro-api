// import redis
import { writeNewUrl, getUrlFromSlug, getSize } from '../models/microModel';
import { apiDescription } from '../docs/apiDescription';
import { logger } from '../utils/logger';
import { renderPageNotFound} from '../views/pageNotFound';
import { renderTestPage } from '../views/renderTestPage';
import { renderServiceNotAvailable } from '../views/serviceNotAvailable';
import { counterToSlug } from '../models/slugCreator';

export const apiHelp = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(apiDescription);
};

const dbNotAvailResponse = (res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({error: 'Database not available.'});
  return;
}

export const addNewURL = (req, res) => {
  // check req.body.url
  // validation for missing or incorrect url
  if (!req.body.url) {
    logger.error('addNewUrl: missing destination url');
    res.json({error: 'Missing key "url" with destination url'});
    return;
  }
  if (req.body.url.indexOf(process.env.HOST) > -1) {
    logger.error('addNewUrl: Destination url cannot be this service!');
    res.json({error: 'Destination url cannot be this service!'});
    return;
  }
  writeNewUrl(req.body.url)
    .then ((result) => {
      logger.log('info','writeNewUrl: result = ',result);
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    }, (error) => {
      logger.error('writeNewUrl: ',error);
      if (!error) {
        dbNotAvailResponse(res);
      }
    }
    );
};

export const redirectSlugToUrl = (req, res) => {
  logger.info('Controller: redirectSlugToUrl: slug = '+req.params.slug);
  const url = getUrlFromSlug(req.params.slug)
    .then( (url) => {
      logger.info('Controller: redirectSlugToUrl: url = '+url);
      if (url) {
        res.redirect(301,url)
      } else {
        res.status(404).end(renderPageNotFound(req.params.slug));
      }

    }, (error) => {
      logger.error('redirectSlugToUrl: ',error);
      if (!error) {
        res.status(503).end(renderServiceNotAvailable());
      }
    });
};

export const size = (req, res) => {
  logger.info('Controller: size: ');
  getSize()
    .then ((result) => {
      logger.log('info','getSize: result = ',result);
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    }, (error) => {
      logger.error('Controller: size:  ',error);
      if (!error) {
        dbNotAvailResponse(res);
      }
    }
    );
};

export const testPage = (req, res) => {
  res.end(renderTestPage());
};

export const lookupDestination = (req, res) => {
  logger.info('Controller: lookupDestination: ');
  if (req.params.slug) {
    getUrlFromSlug(req.params.slug)
    .then( (url) => {
      logger.info('Controller: lookupDestination: url = '+url);
      if (url) {
        res.setHeader('Content-Type', 'application/json');
        res.json({url: url});
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.json({error: 'slug not found.'});
      }

    }, (error) => {
      logger.error('lookupDestination: ',error);
      if (!error) {
        dbNotAvailResponse(res);
      }
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json({error: 'Slug not provided'});
  }
};

export const makeSlug = (req, res) => {
  if (req.params.counter) {
    const slug = counterToSlug(req.params.counter);
    res.setHeader('Content-Type', 'application/json');
    res.json({slug: slug});
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json({error: 'Counter not provided'});
  }
};
