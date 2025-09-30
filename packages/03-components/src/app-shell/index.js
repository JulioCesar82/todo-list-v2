import { LitElement, html } from "lit";
import "../app-header/index.js";
import "../app-sidebar/index.js";
import "../notification-widget/index.js";
import { loadAndAppendTemplate } from '../utils/template-loader.js';

class AppShell extends LitElement {
  static properties = {
    styleTemplateId: { type: String },
    htmlTemplateId: { type: String },
  };

  constructor() {
    super();
    this.styleTemplateId = 'app-shell-style';
    this.htmlTemplateId = 'app-shell-template';
    
    this.attachTemplates();
  }

  attachTemplates() {
    loadAndAppendTemplate(`./${this.styleTemplateId}.html`, this.styleTemplateId);
    loadAndAppendTemplate(`./${this.htmlTemplateId}.html`, this.htmlTemplateId);
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
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("app-shell", AppShell);
