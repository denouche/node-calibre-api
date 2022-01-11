import { HttpRequest, HttpResponse } from 'types';

// eslint-disable-next-line no-unused-vars
export function monitoring(_httpRequest: HttpRequest): HttpResponse {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    return {
      body: healthCheck,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      body: { error: error.message },
      statusCode: 500,
    };
  }
}
