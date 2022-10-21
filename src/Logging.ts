/** Interfaces */
import { IClass } from '@10ign/common-types';

/** Classes */
import { Bridge } from '@10ign/bridge';

/**
 * Enumerated values for Log levels.
 */
enum LogLevelEnum {
  LOG = 'log',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
  TRACE = 'trace',
}

/**
 * Abstract method signatures for Logging service.
 * Those methods should be implemented externally by a bridge.
 */
abstract class AbstractLogging {
  /**
   * Default logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract log(...params: unknown[]): void;

  /**
   * Informational logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract info(...params: unknown[]): void;

  /**
   * Warning logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract warn(...params: unknown[]): void;

  /**
   * Error logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract error(...params: unknown[]): void;

  /**
   * Debugging logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract debug(...params: unknown[]): void;

  /**
   * Tracing logging level.
   *
   * @param params - Arguments to be logged
   */
  abstract trace(...params: unknown[]): void;
}

/**
 * Default implementation class for Logging.
 * This class makes use of the generic console API.
 */
export class LoggingDefaultImplementation extends AbstractLogging {
  /**
   * Default logging level.
   *
   * @param params - Arguments to be logged
   */
  log(...params: unknown[]) {
    console.log(...params);
  }

  /**
   * Informational logging level.
   *
   * @param params - Arguments to be logged
   */
  info(...params: unknown[]) {
    console.info(...params);
  }

  /**
   * Warning logging level.
   *
   * @param params - Arguments to be logged
   */
  warn(...params: unknown[]) {
    console.warn(...params);
  }

  /**
   * Error logging level.
   *
   * @param params - Arguments to be logged
   */
  error(...params: unknown[]) {
    console.error(...params);
  }

  /**
   * Debugging logging level.
   *
   * @param params - Arguments to be logged
   */
  debug(...params: unknown[]) {
    console.debug(...params);
  }

  /**
   * Tracing logging level.
   *
   * @param params - Arguments to be logged
   */
  trace(...params: unknown[]) {
    console.trace(...params);
  }
}

/**
 * Service to handle logging.
 *
 * @remarks Provides a bridge to an external implementation.
 */
class Logging extends Bridge<AbstractLogging> {
  /**
   * Flag that controls whether the logging is completely disabled.
   */
  #disabled: boolean;

  /**
   * Set that controls the disabled state for specific log levels.
   */
  #disabledLevels: Set<LogLevelEnum>;

  constructor() {
    super(AbstractLogging as IClass<AbstractLogging>);
    this.#disabled = false;
    this.#disabledLevels = new Set();
    this.setImplementation(new LoggingDefaultImplementation());
  }

  /**
   * Disables logging completely.
   */
  disable(): void {
    this.#disabled = true;
  }

  /**
   * Enables the logging.
   */
  enable(): void {
    this.#disabled = false;
  }

  /**
   * Disables a specific logging level.
   *
   * @param logLevel - Log level to be disabled
   */
  disableLevel(logLevel: LogLevelEnum): void {
    this.#disabledLevels.add(logLevel);
  }

  /**
   * Enables a specific logging level.
   *
   * @param logLevel - Log level to be disabled
   */
  enableLevel(logLevel: LogLevelEnum): void {
    this.#disabledLevels.delete(logLevel);
  }

  /**
   * Logs the provided arguments if default log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  log(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.LOG)) {
      return this.implementation.log(...params);
    }
  }

  /**
   * Logs the provided arguments if informational log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  info(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.INFO)) {
      return this.implementation.info(...params);
    }
  }

  /**
   * Logs the provided arguments if warning log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  warn(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.WARN)) {
      return this.implementation.warn(...params);
    }
  }

  /**
   * Logs the provided arguments if error log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  error(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.ERROR)) {
      return this.implementation.error(...params);
    }
  }

  /**
   * Logs the provided arguments if debugging log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  debug(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.DEBUG)) {
      return this.implementation.debug(...params);
    }
  }

  /**
   * Logs the provided arguments if tracing log level is enabled.
   *
   * @param params - Arguments to be logged
   */
  trace(...params: unknown[]): void {
    if (!this.#disabled && !this.#disabledLevels.has(LogLevelEnum.TRACE)) {
      return this.implementation.trace(...params);
    }
  }
}

/** Exports */
export { AbstractLogging, Logging, LogLevelEnum };
