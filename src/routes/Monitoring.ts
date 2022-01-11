import { Express } from 'express';

import ExpressRouterAdapter from '../adapters/ExpressRouterAdapter';
import * as monitoringController from '../controllers/MonitoringController';

export function MonitoringRoutes(app: Express) {
  app
    .route('/calibre/monitoring/')
    .get(ExpressRouterAdapter.adapt(monitoringController.monitoring));
}
