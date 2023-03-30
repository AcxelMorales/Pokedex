import { Injectable, Logger } from '@nestjs/common';

export enum Types {
  log,
  debug,
  error,
}

@Injectable()
export class LoggerService {

  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  writeLog(message: string, instance: string, type: Types): void {
    switch (type) {
      case Types.log:
        this.logger.log(message, instance);
        break;
      case Types.debug:
        this.logger.debug(message, instance);
        break;
      case Types.error:
        this.logger.error(message, instance);
        break;
    }
  }

}
