import { EventBusInterface } from "@project/core";

class EventBus extends EventBusInterface {
  constructor() {
    super();
    this.subscriptions = {};
  }

  dispatch(eventName, payload) {
    (this.subscriptions[eventName] || []).forEach((callback) =>
      callback(payload),
    );
  }

  subscribe(eventName, callback) {
    (this.subscriptions[eventName] = this.subscriptions[eventName] || []).push(
      callback,
    );
    // Retorna uma função para cancelar a inscrição
    return () => {
      this.subscriptions[eventName] = this.subscriptions[eventName].filter(
        (sub) => sub !== callback,
      );
    };
  }
}

export const eventBus = new EventBus();
