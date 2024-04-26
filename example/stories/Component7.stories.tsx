import type { Meta, StoryObj } from "@storybook/react";
import { Component7 } from "./Component7.tsx";

const meta: Meta<typeof Component7> = {
  title: "Component 7",
  tags: ["autodocs"],
  component: Component7,
};

export default meta;
type Story = StoryObj<typeof Component7>;

export const Primary: Story = {};
