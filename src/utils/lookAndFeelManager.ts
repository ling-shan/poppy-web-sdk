import { EventEmitter, createEventEmitter } from "./eventEmitter";

let eventEmitter: EventEmitter = (window as any).$lookAndFeelManager;
if (!eventEmitter) {
  eventEmitter = createEventEmitter();
  (window as any).$lookAndFeelManager = eventEmitter;
}

function updateSetting(value?: Record<string, any>) {
  if (!value) {
    return;
  }
  eventEmitter.emit('setting', value);
}

function onSettingUpdated(callback: (setting: Record<string, any>) => void): CallableFunction {
  return eventEmitter.on('setting', (evt) => {
    if (!evt.payload) {
      return;
    }
    callback(evt.payload);
  });
}

export default {
  updateSetting,
  onSettingUpdated
}
