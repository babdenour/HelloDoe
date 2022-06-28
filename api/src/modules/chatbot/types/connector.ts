import { Request } from 'express';

export interface Connector {
  handleRequest: (requestBody: Request['body']) => Promise<Request['body']>;
}
