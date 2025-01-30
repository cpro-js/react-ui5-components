import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets.js";

import { Preview } from "@storybook/react";
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import { ContentDensity, ThemeProvider } from "@ui5/webcomponents-react";
import { useEffect } from "react";

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

  globalTypes: {
    theme: {
      title: "Theme",
      description: "Fiori Theme",
      defaultValue: "sap_horizon",
      toolbar: {
        title: "Theme",
        items: [
          { value: "sap_horizon", title: "Morning Horizon (Light)" },
          { value: "sap_horizon_dark", title: "Evening Horizon (Dark)" },
          { value: "sap_horizon_hcb", title: "Horizon High Contrast Black" },
          { value: "sap_horizon_hcw", title: "Horizon High Contrast White" },
          { value: "sap_fiori_3", title: "Quartz Light" },
          { value: "sap_fiori_3_dark", title: "Quartz Dark" },
          { value: "sap_fiori_3_hcb", title: "Quartz High Contrast Black" },
          { value: "sap_fiori_3_hcw", title: "Quartz High Contrast White" },
        ],
      },
    },
    contentDensity: {
      title: "Content Density",
      description: "Content Density",
      defaultValue: ContentDensity.Cozy,
      toolbar: {
        title: "Content Density",
        items: [
          {
            value: ContentDensity.Cozy,
            title: ContentDensity.Cozy,
          },
          {
            value: ContentDensity.Compact,
            title: ContentDensity.Compact,
          },
        ],
      },
    },
    direction: {
      title: "Direction",
      description: "Text Direction",
      defaultValue: "ltr",
      toolbar: {
        icon: "transfer",
        items: [
          {
            value: "ltr",
            title: "LTR",
          },
          {
            value: "rtl",
            title: "RTL",
          },
        ],
      },
    },
    language: {
      title: "Languages",
      description: "Languages",
      defaultValue: "local",
      toolbar: {
        icon: "globe",
        items: [
          {
            value: "local",
            title: "Local language",
          },
          {
            value: "de",
            title: "German",
          },
          {
            value: "en",
            title: "English",
          },
        ],
      },
    },
  },

  decorators: [
    (Story, { globals }) => {
      const { theme, contentDensity, direction, language } = globals;

      useEffect(() => {
        if (language === "local") {
          setLanguage(null);
        } else {
          setLanguage(language);
        }
      }, [language]);

      useEffect(() => {
        if (contentDensity === ContentDensity.Compact) {
          document.body.classList.add("ui5-content-density-compact");
        } else {
          document.body.classList.remove("ui5-content-density-compact");
        }
      }, [contentDensity]);

      useEffect(() => {
        document.querySelector("html").setAttribute("dir", direction);
        applyDirection();
      }, [direction]);

      useEffect(() => {
        setTheme(theme);
      }, [theme]);

      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],

  tags: ["autodocs"],
};
export default preview;
