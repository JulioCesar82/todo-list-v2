import { LitElement, html, css } from 'lit';
import { eventBus } from '@project/data';

export class NotificationWidget extends LitElement {
  static styles = css`
    .widget { position: fixed; bottom: 1rem; right: 1rem; background-color: #222; color: white; padding: 1rem; border-radius: 8px; z-index: 1000; opacity: 0; transition: opacity 0.5s, transform 0.5s; visibility: hidden; transform: translateY(20px); }
    .widget.visible { opacity: 1; visibility: visible; transform: translateY(0); }
  `;
  static properties = { message: { type: String }, isVisible: { type: Boolean } };

  constructor() {
    super();
    this.message = '';
    this.isVisible = false;
    this.timeout = null;
    this.unsubCreated = null;
    this.unsubRemoved = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubCreated = eventBus.subscribe('todo:created', (task) => this.show(`Tarefa '${task.description}' foi criada.`));
    this.unsubRemoved = eventBus.subscribe('todo:removed', (task) => this.show(`Tarefa '${task.description}' foi removida.`));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if(this.unsubCreated) this.unsubCreated();
    if(this.unsubRemoved) this.unsubRemoved();
  }
  
  show(message) {
    this.message = message;
    this.isVisible = true;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { this.isVisible = false; }, 4000);
  }

  render() {
    return html`<div class="widget ${this.isVisible ? 'visible' : ''}">${this.message}</div>`;
  }
}
customElements.define('notification-widget', NotificationWidget);
