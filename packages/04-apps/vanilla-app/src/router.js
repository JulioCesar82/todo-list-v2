import { sessionService } from "@project/data";

// Variável para alternar entre telas padrão e customizadas
export let useCustomScreens = true;

// Carrega templates customizados organizados em subpastas por componente
[
  "login-form/login-form-style.html",
  "login-form/login-form-template.html",
  "app-header/app-header-style.html",
  "app-header/app-header-template.html",
  "app-shell/app-shell-style.html",
  "app-shell/app-shell-template.html",
  "app-sidebar/app-sidebar-style.html",
  "app-sidebar/app-sidebar-template.html",
  "todo-screen/todo-screen-style.html",
  "todo-screen/todo-screen-template.html",
  "notification-widget/notification-widget-style.html",
  "notification-widget/notification-widget-template.html",
].forEach((file) => {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    });
});



const customRoutes = {
  "/login": () => import("./screens/LoginScreen.js"),
  "/app": () => import("./screens/AppShellScreen.js"),
  "/app/todos": () => import("./screens/TodoScreen.js"),
};
const customComponentTags = {
  "/login": "login-screen",
  "/app": "app-shell-screen",
  "/app/todos": "todo-screen-custom",
};

const defaultRoutes = {
  "/login": () => import("@project/components/login-form"),
  "/app": () => import("@project/components/app-shell"),
  "/app/todos": () => import("@project/components/todo-screen"),
};
const defaultComponentTags = {
  "/login": "login-form",
  "/app": "app-shell",
  "/app/todos": "todo-screen",
};

class Router {
  constructor(appRoot) {
    this.appRoot = appRoot;
    window.addEventListener("popstate", () => this._handleRouteChange());
  }

  navigate(path) {
    window.history.pushState({}, path, path);
    this._handleRouteChange();
  }

  async _handleRouteChange() {
    let path = window.location.pathname;
    if (!sessionService.isAuthenticated() && path !== "/login")
      return this.navigate("/login");
    if (sessionService.isAuthenticated() && (path === "/login" || path === "/"))
      return this.navigate("/app/todos");
    if (path === "/app") return this.navigate("/app/todos");

    const routesToUse = useCustomScreens ? customRoutes : defaultRoutes;
    const tagsToUse = useCustomScreens ? customComponentTags : defaultComponentTags;
    if (path.startsWith("/app")) {
      await routesToUse[path]();
      this.appRoot.replaceChildren(document.createElement(tagsToUse[path]));
    } else {
      await routesToUse["/login"]();
      this.appRoot.replaceChildren(document.createElement(tagsToUse["/login"]));
    }
  }
}
export const router = new Router(document.getElementById("app-root"));
