import { LitElement, html } from "lit";

class AppSidebar extends LitElement {
  constructor() {
    super();
    this.attachTemplates();
  }

  attachTemplates() {
    if (!document.getElementById('app-sidebar-style')) {
      import('./app-sidebar-style.html');
    }
    if (!document.getElementById('app-sidebar-template')) {
      import('./app-sidebar-template.html');
    }
  }

  render() {
    const styleTemplate = document.getElementById('app-sidebar-style');
    const htmlTemplate = document.getElementById('app-sidebar-template');
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
      </div>
    `;
  }
}

customElements.define("app-sidebar", AppSidebar);
