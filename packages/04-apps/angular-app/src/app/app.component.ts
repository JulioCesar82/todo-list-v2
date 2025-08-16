import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@project/components/login-form';
import '@project/components/app-shell';
import '@project/components/todo-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1 style="text-align: center;">Aplicação Angular</h1>
    <app-shell *ngIf="isAuthenticated">
        <todo-screen></todo-screen>
    </app-shell>
    <login-form 
      *ngIf="!isAuthenticated"
      (login-success)="handleLoginSuccess($event)">
    </login-form>
  `,
})
export class AppComponent {
  isAuthenticated = false;

  handleLoginSuccess(event: any) {
    console.log('Angular App: Login OK', event.detail);
    document.cookie = `session_token=${event.detail.token}; Path=/;`;
    this.isAuthenticated = true;
  }
}