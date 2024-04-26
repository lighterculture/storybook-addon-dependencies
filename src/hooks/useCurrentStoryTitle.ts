import React from "react";
import { DocsContext } from "@storybook/blocks";
import { useContext } from "react";

export const useCurrentStoryTitle = () => {
  return useContext(DocsContext).storyById().title;
};
