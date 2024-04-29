import type { Meta, StoryObj } from "@storybook/react";
import { Component4 } from "./Component4.tsx";

const meta: Meta<typeof Component4> = {
  title: "Component 4",
  tags: ["autodocs"],
  component: Component4,
};

export default meta;
type Story = StoryObj<typeof Component4>;

export const Primary: Story = {};
