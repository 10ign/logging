import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { AbstractLogging, LoggingDefaultImplementation } from './Logging';

describe('LoggingDefaultImplementation', () => {
  const noop = () => {};
  let logging: AbstractLogging;
  beforeEach(() => {
    jest.clearAllMocks();
    logging = new LoggingDefaultImplementation();
  });

  it('should proxy to console.log', () => {
    const consoleMock = jest.spyOn(console, 'log').mockImplementation(noop);
    logging.log(1, 2);
    expect(consoleMock).toHaveBeenCalledWith(1, 2);
    consoleMock.mockRestore();
  });

  it('should proxy to console.info', () => {
    const consoleMock = jest.spyOn(console, 'info').mockImplementation(noop);
    logging.info('a', 'b', 'c');
    expect(consoleMock).toHaveBeenCalledWith('a', 'b', 'c');
    consoleMock.mockRestore();
  });

  it('should proxy to console.warn', () => {
    const consoleMock = jest.spyOn(console, 'warn').mockImplementation(noop);
    logging.warn({ a: 1 });
    expect(consoleMock).toHaveBeenCalledWith({ a: 1 });
    consoleMock.mockRestore();
  });

  it('should proxy to console.error', () => {
    const consoleMock = jest.spyOn(console, 'error').mockImplementation(noop);
    logging.error([4, 5, 6]);
    expect(consoleMock).toHaveBeenCalledWith([4, 5, 6]);
    consoleMock.mockRestore();
  });

  it('should proxy to console.debug', () => {
    const consoleMock = jest.spyOn(console, 'debug').mockImplementation(noop);
    logging.debug(null);
    expect(consoleMock).toHaveBeenCalledWith(null);
    consoleMock.mockRestore();
  });

  it('should proxy to console.trace', () => {
    const consoleMock = jest.spyOn(console, 'trace').mockImplementation(noop);
    logging.trace(undefined);
    expect(consoleMock).toHaveBeenCalledWith(undefined);
    consoleMock.mockRestore();
  });
});
