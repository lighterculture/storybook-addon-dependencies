import React from "react";
import { useCurrentStoryTitle } from "../hooks/useCurrentStoryTitle.js";
import { getDependenciesTree } from "../utils/getTree.js";
import { Accordion } from "./Accordion.js";
import { ResetWrapper } from "@storybook/components";
import { EmptyDeps, StyledHeading } from "./StyledStorybook.js";
export const Dependencies = () => {
    const storyTitle = useCurrentStoryTitle();
    const dependencies = getDependenciesTree(storyTitle) ?? [];
    const deps = dependencies.length != 0 ? (React.createElement(Accordion, { depList: dependencies, treeMode: true })) : (React.createElement(EmptyDeps, null, "No dependencies found for this component"));
    return (React.createElement(ResetWrapper, null,
        React.createElement(StyledHeading, null, "Dependencies"),
        deps));
};
