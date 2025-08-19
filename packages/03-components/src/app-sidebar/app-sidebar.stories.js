import "./index.js";
import { html } from "lit";

export default {
  title: "App Sidebar",
  component: "app-sidebar",
};

const Template = () => html`<app-sidebar></app-sidebar>`;

export const Default = Template.bind({});
