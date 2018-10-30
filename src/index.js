// entry point for mic.ro using using ES2015 syntax
import express from 'express'
import routes from './routes/microRoutes'
import bodyParser from 'body-parser'
import { logger } from './utils/logger';
require('dotenv').config();

const app = express()
// bodyparser setup
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//Launch server
app.listen(process.env.PORT, () => {
  logger.log('info', `Mic.ro slug API serice has started and listening on port ${process.env.PORT}`);
})

export default app;
