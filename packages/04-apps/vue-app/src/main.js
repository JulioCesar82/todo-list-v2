
import { createApp } from "vue";
import App from "./App.vue";
import "@project/components/login-form";
import "@project/components/app-shell";
import "@project/components/todo-screen";

// Importa templates padrão dos componentes para o DOM
import "@project/components/app-header/app-header-style.html";
import "@project/components/app-header/app-header-template.html";
import "@project/components/app-shell/app-shell-style.html";
import "@project/components/app-shell/app-shell-template.html";
import "@project/components/app-sidebar/app-sidebar-style.html";
import "@project/components/app-sidebar/app-sidebar-template.html";
import "@project/components/login-form/login-form-style.html";
import "@project/components/login-form/login-form-template.html";
import "@project/components/todo-screen/todo-screen-style.html";
import "@project/components/todo-screen/todo-screen-template.html";
import "@project/components/notification-widget/notification-widget-style.html";
import "@project/components/notification-widget/notification-widget-template.html";

createApp(App).mount("#app");
