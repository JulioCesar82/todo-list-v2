
import { sessionService as realSessionService } from "@project/data";

import { LitElement, html } from "lit";
import { sessionService as realSessionService } from "@project/data";

class AppHeader extends LitElement {
  static properties = {
    userName: { state: true },
    sessionService: { state: true },
  };

  constructor() {
    super();
    this.userName = "";
    this.sessionService = realSessionService;
    this.attachTemplates();
  }

  attachTemplates() {
    if (!document.getElementById('app-header-style')) {
      import('./app-header-style.html');
    }
    if (!document.getElementById('app-header-template')) {
      import('./app-header-template.html');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = this.sessionService.onChange(() => this.requestUpdate());
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const user = this.sessionService.getUser();
    const styleTemplate = document.getElementById('app-header-style');
    const htmlTemplate = document.getElementById('app-header-template');
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
        <span>${user ? `Olá, ${user.name}` : 'Olá, Visitante'}</span>
        ${user ? html`<button @click=${() => this.sessionService.logout()}>Sair</button>` : ''}
      </div>
    `;
  }
}

customElements.define("app-header", AppHeader);
