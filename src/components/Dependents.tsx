import React from "react";
import { useCurrentStoryTitle } from "../hooks/useCurrentStoryTitle.js";
import { getDependentsTree } from "../utils/getTree.js";
import { ResetWrapper } from "@storybook/components";
import { EmptyDeps, StyledHeading } from "./StyledStorybook.js";
import { Accordion } from "./Accordion.js";

export const Dependents = () => {
  const storyTitle = useCurrentStoryTitle();
  const dependents = getDependentsTree(storyTitle);
  const deps =
    dependents.length != 0 ? (
      <Accordion depList={dependents} treeMode={false} />
    ) : (
      <EmptyDeps>No dependents found for this component</EmptyDeps>
    );

  return (
    <ResetWrapper>
      <StyledHeading>{"Dependents"}</StyledHeading>
      {deps}
    </ResetWrapper>
  );
};
