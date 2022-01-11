import { Express } from 'express';

import ExpressRouterAdapter from '../adapters/ExpressRouterAdapter';
import * as calibreController from '../controllers/CalibreController';

export function CalibreRoutes(app: Express) {
  app.route('/calibre/ebook-convert').post(calibreController.ebookConvert);

  app
    .route('/calibre/ebook-convert-base64')
    .post(ExpressRouterAdapter.adapt(calibreController.ebookConvertBase64));
}
