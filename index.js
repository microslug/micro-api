// entry point for mic.ro using using ES2015 syntax
import express from 'express'
import routes from './src/routes/microRoutes'
import bodyParser from 'body-parser'
import { logger } from './src/utils/logger';
require('dotenv').config();

const app = express()

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

//Launch server
app.listen(process.env.PORT, () => {
  logger.log('info', `Mic.ro slug API serice has started and listening on port ${process.env.PORT}`);
})

export default app;
