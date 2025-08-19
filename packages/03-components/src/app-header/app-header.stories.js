import "./index.js";
import { html } from "lit";
import { User } from "@project/core";

const mockSessionService = (user) => ({
  getUser: () => user,
  logout: () => {},
  onChange: () => () => {},
});

export default {
  title: "App Header",
  component: "app-header",
};

export const Default = {
  render: () => {
    const sessionService = mockSessionService(null);
    return html`<app-header .sessionService=${sessionService}></app-header>`;
  },
};

export const LoggedIn = {
  render: () => {
    const user = new User({ id: "1", name: "John Doe", login: "john.doe" });
    const sessionService = mockSessionService(user);
    return html`<app-header .sessionService=${sessionService}></app-header>`;
  },
};

export const LoggedOut = {
  render: () => {
    const sessionService = mockSessionService(null);
    return html`<app-header .sessionService=${sessionService}></app-header>`;
  },
};
