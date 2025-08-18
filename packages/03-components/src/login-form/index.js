import { LitElement, html, css } from 'lit';
import { AuthenticateUserUseCase } from '@project/core';
import { MockAuthRepository, sessionService } from '@project/data';

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
    this.host.errorMessage = '';
    const formData = new FormData(event.target);
    try {
      const result = await this.useCase.execute({
        login: formData.get('login'),
        password: formData.get('password')
      });
      if (result) {
        sessionService.login(result);
        this.host.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true, detail: result }));
      } else {
        this.host.errorMessage = 'As credenciais fornecidas estão incorretas.';
      }
    } catch (e) {
      this.host.errorMessage = 'Ocorreu um erro inesperado.';
    } finally {
      this.host.isLoading = false;
    }
  }
}

export class LoginForm extends LitElement {
  static styles = css`
    .container { max-width: 320px; margin: 3rem auto; padding: 1.5rem; border: 1px solid #ccc; border-radius: 8px; }
    form { display: flex; flex-direction: column; gap: 1rem; }
    .error { color: red; font-size: 0.9rem; }
  `;
  static properties = {
    isLoading: { type: Boolean },
    errorMessage: { type: String }
  };
  constructor() {
    super();
    this.isLoading = false;
    this.errorMessage = '';
    const repo = new MockAuthRepository();
    const useCase = new AuthenticateUserUseCase(repo);
    this.controller = new LoginController(this, { useCase });
  }
  render() {
    return html`
      <div class="container">
        <form @submit=${this.controller.handleSubmit}>
          <h2>Acessar o Sistema</h2>
          <input name="login" type="text" placeholder="Login (admin)" required />
          <input name="password" type="password" placeholder="Senha (admin)" required />
          <button type="submit" .disabled=${this.isLoading}>
            ${this.isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          ${this.errorMessage ? html`<p class="error">${this.errorMessage}</p>` : ''}
        </form>
      </div>
    `;
  }
}
customElements.define('login-form', LoginForm);
