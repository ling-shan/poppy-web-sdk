import { EventEmitter, createEventEmitter } from "./eventEmitter";
import { I18nParamters } from "./i18n";

type ToastMessageType = 'info' | 'success' | 'error' | 'warning';
type Message = string | I18nParamters

interface MessageOpts {
  duration?: number
}

interface ToastMessageData {
  type: ToastMessageType,
  message: Message
  opts?: MessageOpts
}

type HandleToastMessageFunction = (toastMessageData: ToastMessageData) => void;

export interface ToastMessage {
  show(type: ToastMessageType, message: Message, opts?: MessageOpts): void
  success(message: Message, opts?: MessageOpts): void
  error(message: Message, opts?: MessageOpts): void
  warning(message: Message, opts?: MessageOpts): void
  onShowToastMessage(callback: HandleToastMessageFunction): CallableFunction
}

let eventEmitter: EventEmitter = (window as any).$toastMessageEmitter;
if (!eventEmitter) {
  eventEmitter = createEventEmitter();
  (window as any).$toastMessageEmitter = eventEmitter;
}

class ToastMessageImpl implements ToastMessage {
  show(type: ToastMessageType, message: Message, opts?: MessageOpts): void {
    eventEmitter.emit('toastMessage', {
      type,
      message,
      opts,
    });
  }
  success(message: Message, opts?: MessageOpts): void {
    this.show("success", message, opts);
  }
  error(message: Message, opts?: MessageOpts): void {
    this.show("error", message, opts);
  }
  warning(message: Message, opts?: MessageOpts | undefined): void {
    this.show("warning", message, opts);
  }

  onShowToastMessage(callback: HandleToastMessageFunction): CallableFunction {
    return eventEmitter.on((evt) => {
      callback(evt.payload);
    })
  }
}

const toastMessage = (window as any).$toastMessage = new ToastMessageImpl();

(window as any).$toastMessage = toastMessage;

export default toastMessage;
