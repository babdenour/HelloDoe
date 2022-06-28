import { NodeEnv } from '@modules/node-env';
import * as path from 'path';
import * as winston from 'winston';

const NODE_ENV = process.env.NODE_ENV;

function buildFormats(): winston.Logform.Format {
  const formats = [];

  formats.push(winston.format.json());
  formats.push(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
  );

  if (NODE_ENV !== NodeEnv.PRODUCTION) {
    formats.push(winston.format.prettyPrint());
  }

  return winston.format.combine(...formats);
}

function buildTransports(): winston.transport[] {
  const transports: winston.transport[] = [];

  if (NODE_ENV === NodeEnv.PRODUCTION) {
    transports.push(
      new winston.transports.File({
        filename: 'combined.log',
        level: 'info',
        dirname: path.join(__dirname, '..', 'logs'),
        format: buildFormats(),
      }),
    );
  } else {
    transports.push(
      new winston.transports.Console({
        level: 'info',
        format: buildFormats(),
      }),
    );
  }

  return transports;
}

export default winston.createLogger({
  level: 'info',
  format: buildFormats(),
  transports: buildTransports(),
});
