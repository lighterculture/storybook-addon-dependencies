import type { Meta, StoryObj } from "@storybook/react";
import { Component1 as Test } from "./Component1";

const meta: Meta<typeof Test> = {
  title: "Component 1",
  tags: ["autodocs"],
  component: Test,
};

type Story = StoryObj<typeof Test>;

export const Primary: Story = {};
export default meta;
