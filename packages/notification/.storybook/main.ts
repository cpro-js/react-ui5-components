import { dirname, join } from "path";

import { StorybookConfig } from "@storybook/react-webpack5";

const getAbsolutePath = (value: string) =>
  dirname(require.resolve(join(value, "package.json")));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath(
      "@storybook/react-webpack5"
    ) as "@storybook/react-webpack5",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
