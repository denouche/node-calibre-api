import { Request } from 'express';

export type HttpRequest = {
  body?: Request['body'];
  path?: Request['path'];
  query?: Request['query'];
};

export type HttpResponse = {
  statusCode: number;
  body: any;
  isDownload?: boolean;
};
