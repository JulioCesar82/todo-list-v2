import { LitElement, html, css } from 'lit';
import '../app-header/index.js';
import '../app-sidebar/index.js';
import '../notification-widget/index.js';

export class AppShell extends LitElement {
    static styles = css`
        .layout { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: auto 1fr; height: 100vh; }
        app-header { grid-column: 1 / 3; }
        main { padding: 1.5rem; }
    `;
    render() {
        return html`
            <div class="layout">
                <app-header></app-header>
                <app-sidebar></app-sidebar>
                <main><slot></slot></main>
                <notification-widget></notification-widget>
            </div>
        `;
    }
}
customElements.define('app-shell', AppShell);
