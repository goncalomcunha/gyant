import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as onFinished from 'on-finished';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.configService.get('LOGGER_ENABLED') === 'false') {
      return next();
    }

    const start = Date.now();
    const requestLogHeader = `${req.method}\t${req.baseUrl}`;

    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    // let body: string;
    (res as any).write = (...restArgs) => {
      chunks.push(Buffer.from(restArgs[0]));
      oldWrite.apply(res, restArgs);
    };
    (res as any).end = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      oldEnd.apply(res, restArgs);
    };
    onFinished(res, (err: any, res: any) => {
      const ms = Date.now() - start;
      const duration = `${ms}ms`;
      const statusCode = req.res
        ? `${res.statusCode} ${res.statusMessage}`
        : '';
      const now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      const sep = '   ';

      const message = `${now}${sep}${requestLogHeader}${sep}${statusCode} (${duration})`;

      if (err || res.statusCode >= 400) {
        console.error(message);
      } else {
        console.info(message);
      }
    });

    next();
  }
}
