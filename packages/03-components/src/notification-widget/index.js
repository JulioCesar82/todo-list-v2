import { LitElement, html } from "lit";
import { eventBus } from "@project/data";
import { loadAndAppendTemplate } from '../utils/template-loader.js';

class NotificationWidget extends LitElement {
  static properties = {
    message: { type: String },
    isVisible: { type: Boolean },

    styleTemplateId: { type: String },
    htmlTemplateId: { type: String },
  };

  constructor() {
    super();
    this.message = "";
    this.isVisible = false;
    this.timeout = null;

    this.unsubCreated = null;
    this.unsubRemoved = null;

    this.styleTemplateId = 'notification-widget-style';
    this.htmlTemplateId = 'notification-widget-template';

    this.attachTemplates();
  }

  attachTemplates() {
    loadAndAppendTemplate(`./${this.styleTemplateId}.html`, this.styleTemplateId);
    loadAndAppendTemplate(`./${this.htmlTemplateId}.html`, this.htmlTemplateId);
  }

  connectedCallback() {
    super.connectedCallback();
   
    this.unsubCreated = eventBus.subscribe("todo:created", (task) =>
      this.show(`Tarefa '${task.description}' foi criada.`),
    );

    this.unsubRemoved = eventBus.subscribe("todo:removed", (task) =>
      this.show(`Tarefa '${task.description}' foi removida.`),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  
    if (this.unsubCreated) this.unsubCreated();
    if (this.unsubRemoved) this.unsubRemoved();
  }

  show(message) {
    this.message = message;
    this.isVisible = true;
    
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }

  render() {
    const styleTemplate = document.getElementById(this.styleTemplateId);
    const htmlTemplate = document.getElementById(this.htmlTemplateId);
  
    let styleContent = '';
    let htmlContent = '';

    if (!styleTemplate) {
      console.error(`Template with ID '${this.styleTemplateId}' not found.`);
      return html`<p>Error: Style template not found.</p>`;
    }
    if (!htmlTemplate) {
      console.error(`Template with ID '${this.htmlTemplateId}' not found.`);
      return html`<p>Error: HTML template not found.</p>`;
    }

    styleContent = styleTemplate.innerHTML;
    htmlContent = htmlTemplate.innerHTML;

    return html`
      ${styleContent ? html([styleContent]) : ''}
      <div>
        ${htmlContent ? html([htmlContent]) : ''}
        <div class="widget ${this.isVisible ? "visible" : ""}"><slot>${this.message}</slot></div>
      </div>
    `;
  }
}

customElements.define("notification-widget", NotificationWidget);
