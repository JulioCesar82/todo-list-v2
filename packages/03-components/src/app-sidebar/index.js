import { LitElement, html, css } from "lit";

export class AppSidebar extends LitElement {
  static styles = css`
    nav {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background-color: #fafafa;
      border-right: 1px solid #ccc;
      height: 100%;
    }
    a {
      padding: 0.5rem;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
    }
    a:hover {
      background-color: #f0f0f0;
    }
  `;
  render() {
    return html`<nav><a href="/app/todos">Gerenciar Tarefas</a></nav>`;
  }
}
customElements.define("app-sidebar", AppSidebar);
