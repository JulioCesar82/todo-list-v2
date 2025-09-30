import '@project/components/app-shell';

export class AppShellScreen extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('./screens/templates/app-shell-screen-template.html');
    const html = await res.text();
    this.innerHTML = html;
  }
}
customElements.define('app-shell-screen', AppShellScreen);