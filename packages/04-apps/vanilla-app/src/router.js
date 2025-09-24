import { sessionService } from "@project/data";

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

const routes = {
  "/login": () => import("@project/components/login-form"),
  "/app": () => import("@project/components/app-shell"),
  "/app/todos": () => import("@project/components/todo-screen"),
};
const componentTags = {
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

    if (path.startsWith("/app")) {
      await routes["/app"]();
      const contentLoader = routes[path];

      const shell = document.createElement(componentTags["/app"]);
      if (contentLoader) {
        await contentLoader();
        const content = document.createElement(componentTags[path]);
        shell.appendChild(content);
      }
      this.appRoot.replaceChildren(shell);
    } else {
      await routes["/login"]();
      this.appRoot.replaceChildren(
        document.createElement(componentTags["/login"]),
      );
    }
  }
}
export const router = new Router(document.getElementById("app-root"));
