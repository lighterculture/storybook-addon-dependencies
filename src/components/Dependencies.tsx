import React from "react";
import { useCurrentStoryTitle } from "../hooks/useCurrentStoryTitle.js";
import { getDependenciesTree } from "../utils/getTree.js";
import { Accordion } from "./Accordion.js";
import { H6, ResetWrapper } from "@storybook/components";
import { EmptyDeps, StyledHeading } from "./StyledStorybook.js";

export const Dependencies = () => {
  const storyTitle = useCurrentStoryTitle();
  const dependencies = getDependenciesTree(storyTitle) ?? [];
  const deps =
    dependencies.length != 0 ? (
      <Accordion depList={dependencies} treeMode={true} />
    ) : (
      <EmptyDeps>No dependencies found for this component</EmptyDeps>
    );

  return (
    <ResetWrapper>
      <StyledHeading>{"Dependencies"}</StyledHeading>
      {deps}
    </ResetWrapper>
  );
};
