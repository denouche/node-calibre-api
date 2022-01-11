import { Request, Response } from 'express';
import { HttpRequest } from 'types';

const conversionTimeout = 10 * 60 * 1000;

export default class ExpressRouterAdapter {
  static adapt(callable: any) {
    return async (req: Request, res: Response) => {
      res.setTimeout(conversionTimeout);

      const httpRequest: HttpRequest = {
        body: req.body,
        path: req.path,
        query: req.query,
      };

      const { statusCode, body, isDownload = false } = await callable(httpRequest);

      if (isDownload) {
        const { path, fileName } = body;
        return res.download(path, fileName);
      }

      return res.status(statusCode).send(body);
    };
  }
}
