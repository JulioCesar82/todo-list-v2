module.exports = {
  stories: ["../**/*.stories.js"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
      exclude: /node_modules/,
    });
    return config;
  },
};
