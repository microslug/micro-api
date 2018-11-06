import {
  addNewURL,
  lookupDestination,
  apiHelp,
  redirectSlugToUrl,
  testPage,
} from '../controllers/microController';
import { logger } from '../utils/logger';
// available routes
// / = api info
// /d3djej  = redirection to actual URL
// /v1/shrink   = shorten url (body contains encoded long URL)
// /v1/lookup/de3df3 = lookup slug

// extract this into env vars
const APIVERSION = 'v1';
const SHRINKAPI = 'shrink';
const LOOKUPAPI = 'lookup';

const routes = (app) => {
  // Documentation page
  app.route('/')
    .get(apiHelp);
  // URL micronizer route
  app.route('/:slug([0-9a-zA-Z]{6,7})')
    .get (redirectSlugToUrl);

  // generate new micro address
  app.route(`/${APIVERSION}/${SHRINKAPI}`)
    .post(addNewURL);

  app.route(`/${APIVERSION}/${LOOKUPAPI}/:slug`)
    .get(lookupDestination)
    // UPDATE URL here
    .put((req,res) =>
      res.status(501)
        .send('Not implemented.'))
    // DELETE URL??
    .delete( (req,res) =>
      res.status(501)
       .send('Not implemented.'))
  // future version
  // app.route(`/${APIVERSION}/status`)
  //   .get(status);

  app.route('/testPage')
    .get(testPage);

  app.route('*')
    .get((req,res) =>
      res.status(404)
        .send('Invalid URL. See documentation <a href="/">here.</a>')
    );

  logger.log('info', 'Routes registered.');
};


export default routes;
