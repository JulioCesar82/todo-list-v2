import { LitElement, html, css } from "lit";
import { sessionService as realSessionService } from "@project/data";

export class AppHeader extends LitElement {
  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
    }
    button {
      cursor: pointer;
    }
  `;

  static properties = {
    userName: { state: true },
    sessionService: { state: true },
  };

  constructor() {
    super();
    this.userName = "";
    this.sessionService = realSessionService;
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

    if (!user) return html`<header><span>Olá, Visitante</span></header>`;

    return html`<header>
      <span>Olá, ${user.name}</span
      ><button @click=${() => this.sessionService.logout()}>Sair</button>
    </header>`;
  }
}
customElements.define("app-header", AppHeader);
