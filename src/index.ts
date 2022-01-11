// eslint-disable-next-line import/no-extraneous-dependencies
import express, { NextFunction, Request, Response } from 'express';
import logger from 'util';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createLog } from 'modules/logging';
import * as routes from './routes';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const app = express();
const errorhandler = require('errorhandler');
const debug = require('debug')('calibre-api:app');

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  app.use(errorhandler({ dumpExceptions: false, showStack: false }));
} else if (env === 'development') {
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
}

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

app.all('/*', (req: Request, _res, next: NextFunction) => {
  debug(`${req.method} ${req.url}`);
  next();
});

routes.CalibreRoutes(app);
routes.MonitoringRoutes(app);

// eslint-disable-next-line no-unused-vars
app.use(async (err: any, req: Request, res: Response) => {
  debug(`Error while calling ${req.method} ${req.url}`);
  await createLog(`Error while calling ${req.method} ${req.url}`);

  debug(logger.inspect(req.headers));
  await createLog(logger.inspect(req.headers));
  debug(logger.inspect(req.body));
  await createLog(logger.inspect(req.body));
  debug('Error is:');
  await createLog('Error is:');
  debug(logger.inspect(err));
  await createLog(logger.inspect(err));
  debug(err.status);
  await createLog(err.status);
  debug(err.stack);
  await createLog(err.stack);

  res.status(500).send();
});

app.listen(app.get('port'), '0.0.0.0');
debug(`Started in ${app.settings.env} on port ${app.get('port')}`);

// eslint-disable-next-line no-console
console.log(`Started in ${app.settings.env} on port ${app.get('port')}`);
