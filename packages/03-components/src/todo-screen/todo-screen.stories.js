import "./index.js";
import { html } from "lit";

export default {
  title: "Todo Screen",
  component: "todo-screen",
};

const Template = () => html`<todo-screen></todo-screen>`;

export const Default = Template.bind({});
