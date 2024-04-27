import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

/** 
	Badge Wrapper for any component.
 */

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Badge",
  parameters: {
    author: "sdandrader",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "",
  },
  render: (args) => (
    <>
      <Badge {...args}>
        <div
          style={{
            background: "#292c2e",
            height: "30px",
            width: "30px",
            borderRadius: "5px",
          }}
        ></div>
      </Badge>
    </>
  ),
};

export const Value: Story = {
  args: {
    children: "",
    value: 3,
  },
  render: (args) => (
    <>
      <Badge {...args}>
        <div
          style={{
            background: "#292c2e",
            height: "30px",
            width: "30px",
            borderRadius: "5px",
          }}
        ></div>
      </Badge>
    </>
  ),
};

export const Translate: Story = {
  args: {
    children: "",
    translate: "50% 50%",
  },
  render: (args) => (
    <>
      <Badge {...args}>
        <div
          style={{
            background: "#292c2e",
            height: "30px",
            width: "30px",
            borderRadius: "5px",
          }}
        ></div>
      </Badge>
    </>
  ),
};

export const Styling: Story = {
  args: {
    children: "",
    bg: "green",
    color: "black",
    value: 1,
  },
  render: (args) => (
    <>
      <Badge {...args}>
        <div
          style={{
            background: "#292c2e",
            height: "30px",
            width: "30px",
            borderRadius: "5px",
          }}
        ></div>
      </Badge>
    </>
  ),
};
