import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "../../dist/preset.js"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
