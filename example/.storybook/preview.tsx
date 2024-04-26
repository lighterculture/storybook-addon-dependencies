import React from "react";
import type { Preview } from "@storybook/react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    // docs: {
    //   theme: themes.dark,
    // },
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
