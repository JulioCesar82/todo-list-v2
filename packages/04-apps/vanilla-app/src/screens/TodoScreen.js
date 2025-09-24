
export class TodoScreen extends HTMLElement {
  async connectedCallback() {
    const res = await fetch('./screens/templates/todo-screen-custom-template.html');
    const html = await res.text();
    this.innerHTML = html;
  }
}
customElements.define('todo-screen-custom', TodoScreen);