import { LitElement, html } from "lit";
import { AuthenticateUserUseCase } from "@project/core";
import { MockAuthRepository, sessionService } from "@project/data";
import { loadAndAppendTemplate } from '../utils/template-loader.js';

class LoginController {
  constructor(host, dependencies) {
    this.host = host;
    this.useCase = dependencies.useCase;

    host.addController(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.host.isLoading = true;
    this.host.errorMessage = "";

    const formData = new FormData(event.target);

    try {
      const result = await this.useCase.execute({
        login: formData.get("login"),
        password: formData.get("password"),
      });

      if (result) {
        sessionService.login(result);

        this.host.dispatchEvent(
          new CustomEvent("login-success", {
            bubbles: true,
            composed: true,
            detail: result,
          }),
        );
      } else {
        this.host.errorMessage = "As credenciais fornecidas estão incorretas.";
      }
    } catch (e) {
      this.host.errorMessage = "Ocorreu um erro inesperado.";
    } finally {
      this.host.isLoading = false;
    }
  }
}

class LoginForm extends LitElement {
  static properties = {
    isLoading: { type: Boolean },
    errorMessage: { type: String },
    
    styleTemplateId: { type: String },
    htmlTemplateId: { type: String },
  };

  constructor() {
    super();
    this.styleTemplateId = 'login-form-style';
    this.htmlTemplateId = 'login-form-template';

    this.attachTemplates();

    this.isLoading = false;
    this.errorMessage = "";

    const repo = new MockAuthRepository();
    const useCase = new AuthenticateUserUseCase(repo);
    
    this.controller = new LoginController(this, { useCase });
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
        ${this.errorMessage ? html`<p slot="error-message" class="error">${this.errorMessage}</p>` : ""}
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
