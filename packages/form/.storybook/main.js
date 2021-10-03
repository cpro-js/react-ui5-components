module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
  ],
  /* typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldRemoveUndefinedFromOptional: false,
      shouldExtractValuesFromUnion: true,
      shouldExtractLiteralValuesFromEnum: true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  }, */
};
