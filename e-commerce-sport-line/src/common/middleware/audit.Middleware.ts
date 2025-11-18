import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;

      let color: (msg: string) => string = chalk.white;
      if (statusCode >= 500) color = chalk.red;
      else if (statusCode >= 400) color = chalk.yellow;
      else if (statusCode >= 300) color = chalk.cyan;
      else color = chalk.green;

      const level = statusCode >= 500 ? 'ERROR' : statusCode >= 400 ? 'WARN' : 'INFO';

      const logMessage = `${chalk.gray(
        `[${new Date().toISOString()}]`,
      )} ${chalk.magenta(method)} ${chalk.white(originalUrl)} → ${color(
        statusCode.toString(),
      )} ${chalk.gray(`(${duration}ms)`)} ${chalk.bold(`[${level}]`)}`;

      console.log(logMessage);
    });

    next();
  }
}
