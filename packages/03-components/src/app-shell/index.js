import { LitElement, html } from "lit";
import "../app-header/index.js";
import "../app-sidebar/index.js";
import "../notification-widget/index.js";

  static styles = [];

  constructor() {
    super();
    this.attachTemplates();
  }

  attachTemplates() {
    if (!document.getElementById('app-shell-style')) {
      import('./app-shell-style.html');
    }
    if (!document.getElementById('app-shell-template')) {
      import('./app-shell-template.html');
    }
  }

  render() {
    const styleTemplate = document.getElementById('app-shell-style');
    const htmlTemplate = document.getElementById('app-shell-template');
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
        <slot></slot>
      </div>
    `;
  }
// ...existing code...
customElements.define("app-shell", AppShell);
