import { LitElement, html, css } from 'lit';
import { sessionService } from '@project/data';

export class AppHeader extends LitElement {
    static styles = css`
        header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background-color: #f0f0f0; border-bottom: 1px solid #ccc; }
        button { cursor: pointer; }
    `;

    static properties = {
        userName: { state: true }
    };

    constructor() {
        super();
        this.userName = '';
        this._sessionChangeHandler = () => this.updateUserName();
        this.unsubscribe = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.unsubscribe = sessionService.onChange(this._sessionChangeHandler);
        this.updateUserName();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if(this.unsubscribe) this.unsubscribe();
    }

    updateUserName() {
        const user = sessionService.getUser();
        this.userName = user ? user.name : 'Visitante';
    }

    render() {
        return html`<header><span>Olá, ${this.userName}</span><button @click=${() => sessionService.logout()}>Sair</button></header>`;
    }
}
customElements.define('app-header', AppHeader);
