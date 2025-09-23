import { LitElement, html } from "lit";
import { AuthenticateUserUseCase } from "@project/core";
import { MockAuthRepository, sessionService } from "@project/data";

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
  };

  constructor() {
    super();
    this.attachTemplates();
    this.isLoading = false;
    this.errorMessage = "";
    const repo = new MockAuthRepository();
    const useCase = new AuthenticateUserUseCase(repo);
    this.controller = new LoginController(this, { useCase });
  }

  attachTemplates() {
    if (!document.getElementById('login-form-style')) {
      import('./login-form-style.html');
    }
    if (!document.getElementById('login-form-template')) {
      import('./login-form-template.html');
    }
  }

  render() {
    const styleTemplate = document.getElementById('login-form-style');
    const htmlTemplate = document.getElementById('login-form-template');
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
        ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ""}
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
