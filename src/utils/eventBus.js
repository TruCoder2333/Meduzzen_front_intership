import { reactive, readonly } from 'vue';

const state = reactive({
  eventCallbacks: new Map(),
});

function on(eventName, callback) {
  if (!state.eventCallbacks.has(eventName)) {
    state.eventCallbacks.set(eventName, new Set());
  }
  state.eventCallbacks.get(eventName).add(callback);
}

function off(eventName, callback) {
  if (state.eventCallbacks.has(eventName)) {
    const callbacks = state.eventCallbacks.get(eventName);
    callbacks.delete(callback);
    if (callbacks.size === 0) {
      state.eventCallbacks.delete(eventName);
    }
  }
}

function emit(eventName, ...args) {
  if (state.eventCallbacks.has(eventName)) {
    state.eventCallbacks.get(eventName).forEach((callback) => {
      callback(...args);
    });
  }
}

export const eventBus = readonly({
  on,
  off,
  emit,
});
