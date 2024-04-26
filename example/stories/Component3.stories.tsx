import type { Meta, StoryObj } from "@storybook/react";
import { Component3 } from "./Component3.tsx";

const meta: Meta<typeof Component3> = {
  title: "Component 3",
  tags: ["autodocs"],
  component: Component3,
};

export default meta;
type Story = StoryObj<typeof Component3>;

export const Primary: Story = {};
