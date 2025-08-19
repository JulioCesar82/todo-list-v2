import "./index.js";
import { html } from "lit";

export default {
  title: "App Shell",
  component: "app-shell",
};

const Template = () => html`<app-shell><h1>Content</h1></app-shell>`;

export const Default = Template.bind({});
