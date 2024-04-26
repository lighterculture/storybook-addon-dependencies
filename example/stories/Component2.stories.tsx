import type { Meta, StoryObj } from "@storybook/react";
import { Component2 } from "./Component2.tsx";

const meta: Meta<typeof Component2> = {
  title: "Component 2",
  tags: ["autodocs"],
  component: Component2,
};

export default meta;
type Story = StoryObj<typeof Component2>;

export const Primary: Story = {};
