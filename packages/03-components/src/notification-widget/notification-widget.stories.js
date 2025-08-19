import "./index.js";
import { html } from "lit";
import { eventBus } from "@project/data";
import { waitFor, screen, within } from "@storybook/test";

export default {
  title: "Notification Widget",
  component: "notification-widget",
};

export const Default = {
  render: () => html`<notification-widget></notification-widget>`,
};

export const WithNotification = {
  render: () => html`<notification-widget></notification-widget>`,
  play: async () => {
    // Dispara um evento que o widget realmente escuta ('todo:removed')
    const mockTask = { description: "My test task" };
    eventBus.dispatch("todo:removed", mockTask);

    // Espera até que a mensagem formatada apareça no DOM
    await waitFor(async () => {
      const expectedMessage = `Tarefa '${mockTask.description}' foi removida.`;
      const notification = await within(document.body).findByText(
        expectedMessage,
      );
      if (!notification) {
        throw new Error("Notification not found in document.body");
      }
    });
  },
};
