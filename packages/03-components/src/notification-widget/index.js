// ...existing code...

  attachTemplates() {
    if (!document.getElementById('notification-widget-style')) {
      import('./notification-widget-style.html');
    }
    if (!document.getElementById('notification-widget-template')) {
      import('./notification-widget-template.html');
    }
  }
    static get properties() {
      return {
        message: { type: String },
        isVisible: { type: Boolean },
      };
    }

    constructor() {
      super();
      this.message = "";
      this.isVisible = false;
      this.timeout = null;
      this.unsubCreated = null;
      this.unsubRemoved = null;
      this.attachTemplates();
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
    const styleTemplate = document.getElementById('notification-widget-style');
    const htmlTemplate = document.getElementById('notification-widget-template');
    let styleContent = '';
    let htmlContent = '';
    if (styleTemplate) {
      styleContent = styleTemplate.innerHTML;
    }
    if (htmlTemplate) {
      htmlContent = htmlTemplate.innerHTML;
    }
    return html`
      ${styleContent ? html([styleContent]) : ''}
      <div>
        ${htmlContent ? html([htmlContent]) : ''}
        <div class="widget ${this.isVisible ? "visible" : ""}">${this.message}</div>
      </div>
    `;
  }
}
customElements.define("notification-widget", NotificationWidget);
