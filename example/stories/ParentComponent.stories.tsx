import type { Meta, StoryObj } from "@storybook/react";
import { ParentComponent } from "./ParentComponent.tsx";
import { themes } from "@storybook/theming";

const meta: Meta<typeof ParentComponent> = {
  title: "Parent Component",
  parameters: {
    docs: {
      theme: themes.dark,
    },
  },
  tags: ["autodocs"],
  component: ParentComponent,
};

export default meta;
type Story = StoryObj<typeof ParentComponent>;

export const Primary: Story = {
  args: {},
};
