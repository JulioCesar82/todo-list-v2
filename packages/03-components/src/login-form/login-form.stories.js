import "./index.js";
import { html } from "lit";
import { fn } from "@storybook/test";

export default {
  title: "Login Form",
  component: "login-form",
  args: {
    onLoginSuccess: fn(),
  },
};

const Template = ({ onLoginSuccess }) => html`
  <login-form @login-success=${onLoginSuccess}></login-form>
`;

export const Default = Template.bind({});
