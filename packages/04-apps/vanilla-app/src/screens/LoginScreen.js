
export class LoginScreen extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('./screens/templates/login-screen-template.html');
    const html = await res.text();
    this.innerHTML = html;
  }
}
  // import '@project/components/login-form';