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

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

class ErrorHandlingImpl implements ErrorHandling {
  private errorHandlers: HandleErrroFunction[] = [];

  onHandleError(callback: HandleErrroFunction): CallableFunction {
    if (this.errorHandlers.includes(callback)) {
      return noop;
    }

    this.errorHandlers.push(callback);

    return () => {
      const delIndex = this.errorHandlers.indexOf(callback);
      if (delIndex < 0) {
        return;
      }
      this.errorHandlers.splice(delIndex, 1);
    }
  }

  constructor() {
    eventEmitter.on((evt) => {
      let err = evt.payload;
      // from the last oen to previos one.
      const errorHandlers = [...this.errorHandlers].reverse();
      for (const errorHandler of errorHandlers) {
        const errorResult = errorHandler(err);
        if (!!errorResult && typeof errorResult !== "boolean") {
          // process the err with previos
          err = errorResult;
        } else {
          break;
        }
      }
    })
  }

  /**
   * @param error
   */
  handleError(error: unknown) {
    eventEmitter.emit('error', error);
  }
}

const errorHandling:ErrorHandling = (window as any).$errorHandling ?? new ErrorHandlingImpl();

(window as any).$errorHandling = errorHandling;

export default errorHandling


