import "@ui5/webcomponents/dist/Assets";
import "@ui5/webcomponents-fiori/dist/Assets";
import "@ui5/webcomponents-react/dist/Assets";

import { ThemeProvider } from "@ui5/webcomponents-react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story) => {
    return <ThemeProvider>{story()}</ThemeProvider>;
  },
];
