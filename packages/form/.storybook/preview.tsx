import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

import { Preview } from "@storybook/react";
import { ThemeProvider } from "@ui5/webcomponents-react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
  },
  decorators: [
    (story, ...args) => {
      return <ThemeProvider>{story()}</ThemeProvider>;
    },
  ],
};
export default preview;
