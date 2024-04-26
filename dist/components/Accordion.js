import React, { useState } from "react";
import { Link } from "@storybook/components";
import { RowDiv, Table, RowsContainer } from "./StyledStorybook.js";
import { ChevronRightIcon } from "@storybook/icons";
import { linkTo } from "@storybook/addon-links";
import { getDependenciesTree, getDependentsTree } from "../utils/getTree.js";
let getTree = getDependenciesTree;
export const Accordion = ({ depList, treeMode }) => {
    getTree = treeMode ? getDependenciesTree : getDependentsTree;
    return (React.createElement(Table, null,
        React.createElement(RecursiveRendering, { depList: depList })));
};
const RecursiveRendering = ({ depList }) => {
    return depList.map((depTitle) => {
        const dep = getTree(depTitle);
        if (dep.length === 0) {
            return React.createElement(Row, { name: depTitle, key: depTitle });
        }
        else {
            return React.createElement(ContainerRow, { name: depTitle, depList: dep, key: depTitle });
        }
    });
};
const ContainerRow = ({ name, depList }) => {
    const [open, setOpen] = useState(false);
    return (React.createElement(React.Fragment, null,
        React.createElement(RowDiv, { "$isOpen": open, onClick: () => {
                setOpen(!open);
            } },
            React.createElement(ChevronRightIcon, null),
            React.createElement(Anchor, { name: name })),
        React.createElement(RowsContainer, { "$isOpen": open },
            React.createElement("div", { style: { overflow: "hidden" } },
                React.createElement(RecursiveRendering, { depList: depList })))));
};
export const Row = ({ name }) => (React.createElement(RowDiv, null,
    React.createElement(Anchor, { name: name })));
const Anchor = ({ name }) => {
    const onClick = (e) => {
        e.stopPropagation();
    };
    return (React.createElement("div", { onClick: onClick },
        React.createElement(Link, { onClick: linkTo(name) }, name)));
};
