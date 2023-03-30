/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, createEventEmitter } from "./eventEmitter";

type HandleErrroFunction = (error: unknown) => void | unknown;

let eventEmitter: EventEmitter = (window as any).$errorHanldingEmitter;
if (!eventEmitter) {
  eventEmitter = createEventEmitter();
  (window as any).$errorHanldingEmitter = eventEmitter;
}

export interface ErrorHandling {
  onHandleError(callback: HandleErrroFunction): CallableFunction
  handleError(error: unknown): void
}

class ErrorHandlingImpl implements ErrorHandling {
  onHandleError(callback: HandleErrroFunction): CallableFunction {
    return eventEmitter.on((evt) => {
      callback(evt.payload)
    })
  }

  /**
   * @param error
   */
  handleError(error: unknown) {
    eventEmitter.emit('error', error);
  }
}

export default new ErrorHandlingImpl();


