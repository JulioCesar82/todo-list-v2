export class EventBusInterface {
  dispatch(eventName, payload) {
    throw new Error("Method not implemented.");
  }
  subscribe(eventName, callback) {
    throw new Error("Method not implemented.");
  }
}