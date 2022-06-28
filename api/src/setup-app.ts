import { INestApplication } from '@nestjs/common';
import { middleware as httpContext } from 'express-http-context';

import router from './router';
import * as loggerMiddleware from './router/middlewares/logger.middleware';

export function setupApp(app: INestApplication): void {
  setCors(app);

  app.use(httpContext);
  app.use(loggerMiddleware);
  app.use('/', router);
}

function setCors(app: INestApplication): void {
  app.enableCors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT'],
    origin: true,
  });
}
