import { LitElement, html } from "lit";
import { sessionService as realSessionService } from "@project/data";
import { loadAndAppendTemplate } from '../utils/template-loader.js';

class AppHeader extends LitElement {
  static properties = {
    userName: { state: true },
    sessionService: { state: true },
    
    styleTemplateId: { type: String },
    htmlTemplateId: { type: String },
  };

  constructor() {
    super();
    this.userName = "";
    this.sessionService = realSessionService;

    this.styleTemplateId = 'app-header-style';
    this.htmlTemplateId = 'app-header-template';

    this.attachTemplates();
  }

  attachTemplates() {
    loadAndAppendTemplate(`./${this.styleTemplateId}.html`, this.styleTemplateId);
    loadAndAppendTemplate(`./${this.htmlTemplateId}.html`, this.htmlTemplateId);
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
        <span slot="user-greeting">${user ? `Olá, ${user.name}` : 'Olá, Visitante'}</span>
        ${user ? html`<button slot="logout-button" @click=${() => this.sessionService.logout()}>Sair</button>` : ''}
      </div>
    `;
  }
}

customElements.define("app-header", AppHeader);
