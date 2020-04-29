// entry point for mic.ro using using ES2015 syntax
import express from 'express'
import routes from './routes/microRoutes'
import bodyParser from 'body-parser'
import { logger } from './utils/logger';
import { shell } from './utils/shell';

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

const getIp = () => {
    // get public ip
    logger.info('Getting service public IP...');
    const cmd = `kubectl get service micro-api-deployment -o json | jq -r '.status.loadBalancer.ingress[0].ip' | xargs | tr -d "\n" | tr -d "\r"`
    const isValidIP=/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
    shell(cmd)
      .then( (ret) => {
        if (isValidIP.test(ret)) {
          process.env.MICRO_URL = `http://${ret}`;
          logger.info(`Setting env.MICRO_URL=${process.env.MICRO_URL}`);
        } else {
          setTimeout(() => getIp(),5000);
        }
      }
  )
      .catch( ( err ) =>  console.log('Command error ',err));
}

//Launch server
app.listen(process.env.PORT, () => {
  logger.log('info', `Mic.ro slug API serice has started and listening on port ${process.env.PORT}`);

  getIp();

})

export default app;
