import { resolve } from "path";
import { loadConfigFromFile, mergeConfig } from "vite";

export default {
  stories: [
    "../src/**/*.stories.js"
  ],
  addons: [],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      resolve(__dirname, "../vite.config.js"),
    );

    return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [],
    });
  },
};
