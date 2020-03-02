import { Injectable, LoggerService, Logger } from '@nestjs/common';
import winston = require('winston');
import { constants } from '../config/constants';
import { Syslog } from 'winston-syslog';

@Injectable()
export class AppLoggerService implements LoggerService {

  /**
   * Instance variables
   */
  public readonly logFormat = winston.format.printf((info) => `[${info.level}] ${info.message}`);
  public readonly winstonPapertrail = new Syslog({
    host: constants.paperTrail.host,
    port: constants.paperTrail.port,
    app_name: constants.paperTrail.appName,
    localhost: constants.paperTrail.appName,
  });
  public readonly logger: any;

  /**
   * Constructor
   */
  constructor() {
    if (constants.paperTrail.host) {
      // Error handler
      this.winstonPapertrail.on('error', this._acceptError);
      // Define logger
      this.logger = winston.createLogger({
        transports: [ this.winstonPapertrail ],
        format: this.logFormat,
      });
    } else {
      this.logger = new Logger();
    }
    this.log('Successful initialization of logger service on startup.', constants.loggerBootstrapContext);
    this.log('NestJS backend is now accepting HTTP calls.', constants.loggerBootstrapContext);
  }

  /**
   * Gracefully accept errors
   */
  _acceptError(): void {}

  /**
   * IMPLEMENT NESTJS & WINSTON BASED LOGGING METHODS FOR FULL COVERAGE
   */
  log(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.log(message, context);
    } else {
      this.logger.info(`[${context}] ${message}`);
    }
  }

  error(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.error(message, context);
    } else {
      this.logger.error(`[${context}] ${message}`);
    }
  }

  warn(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.warn(message, context);
    } else {
      this.logger.warn(`[${context}] ${message}`);
    }
  }

  debug(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.debug(message, context);
    } else {
      this.logger.debug(`[${context}] Debug logs are masked. Please remove them from production environment.`);
    }
  }

  verbose(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.verbose(message, context);
    } else {
      this.logger.verbose(`[${context}] ${message}`);
    }
  }

  silly(message: string, context: string): void {
    if (this.logger instanceof Logger) {
      this.logger.log(message, context);
    } else {
      this.logger.silly(`[${context}] ${message}`);
    }
  }

}
