import { json, urlencoded } from 'body-parser';
import { RequestHandler } from 'express';

export const bodyParserMiddlewares: RequestHandler[] = [
  urlencoded({ extended: true }),
  json(),
  json({ type: 'application/vnd.api+json' }),
];
