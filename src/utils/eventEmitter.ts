/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventObject<P = any> {
  eventName: string;
  payload: P;
}

export type EventHandler<P = any> = (evt: EventObject<P>) => false | void;
type CleanFunction = () => void;

interface EventObserver {
  eventName: string | null;
  eventHandler: EventHandler;
  once: boolean;
}

export interface EventEmitter {
  emit(eventName: string, payload?: any): boolean;
  on<P = any>(listener: EventHandler<P>, once?: boolean): CleanFunction;
  on<P = any>(eventName: string, listener: EventHandler<P>, once?: boolean): CleanFunction;
  clear(): void;
}

export function createEventEmitter(): EventEmitter {
  return new EventEmitterImpl();
}

export function isInstanceOfEventEmitter(target: any): boolean {
  return target instanceof EventEmitterImpl;
}

class EventEmitterImpl implements EventEmitter {
  private eventObservers: Set<EventObserver> | null = null;

  private addEventObserver(eventObserver: EventObserver): CleanFunction {
    let eventObservers = this.eventObservers;
    if (!eventObservers) {
      eventObservers = new Set();
      this.eventObservers = eventObservers;
    }

    eventObservers.add(eventObserver);

    let cleaned = false;
    const clean: CleanFunction = () => {
      if (cleaned) {
        return;
      }

      cleaned = true;
      if (!eventObservers) {
        return;
      }
      eventObservers.delete(eventObserver);
    };
    return clean;
  }

  emit(eventName: string, payload?: any): boolean {
    const eventObservers = this.eventObservers;
    if (!eventObservers) {
      return false;
    }

    if (eventObservers.size === 0) {
      return false;
    }

    let eventObject: EventObject | null = null;
    for (const eventObserver of eventObservers) {
      if (eventObserver.eventName && eventObserver.eventName !== eventName) {
        continue;
      }

      if (!eventObject) {
        eventObject = {
          eventName,
          payload
        };
      }

      const handleResult = eventObserver.eventHandler(eventObject);
      if (eventObserver.once) {
        eventObservers.delete(eventObserver);
      }

      if (handleResult === false) {
        break;
      }
    }

    return !!eventObject;
  }

  on<P = any>(listener: EventHandler<P>): CleanFunction;
  on<P = any>(listener: EventHandler<P>, once?: boolean): CleanFunction;
  on<P = any>(eventName: string, listener: EventHandler<P>, once?: boolean): CleanFunction;
  on(...args: any[]): CleanFunction {
    const argsLen = args.length;
    if (argsLen === 1 && typeof args[0] === "function") {
      return this.addEventObserver({
        eventName: null,
        eventHandler: args[0],
        once: false
      });
    }

    if (
      argsLen === 2 && // eslint-disable-line no-magic-numbers
      typeof args[0] === "function" &&
      typeof args[1] === "boolean"
    ) {
      return this.addEventObserver({
        eventName: null,
        eventHandler: args[0],
        once: args[1]
      });
    }

    if (
      argsLen === 2 && // eslint-disable-line no-magic-numbers
      typeof args[0] === "string" &&
      typeof args[1] === "function"
    ) {
      return this.addEventObserver({
        eventName: args[0] ?? null,
        eventHandler: args[1],
        once: false
      });
    }

    if (
      argsLen === 3 && // eslint-disable-line no-magic-numbers
      typeof args[0] === "string" &&
      typeof args[1] === "function" &&
      typeof args[2] === "boolean"
    ) {
      return this.addEventObserver({
        eventName: args[0] ?? null,
        eventHandler: args[1],
        once: args[2] ?? false
      });
    }

    throw new Error("InvalidArguments");
  }

  clear() {
    this.eventObservers?.clear();
  }
}
