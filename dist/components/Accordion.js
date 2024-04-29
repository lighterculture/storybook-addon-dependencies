import React, { useState } from "react";
import { Link } from "@storybook/components";
import { RowDiv, Table, RowsContainer } from "./StyledStorybook.js";
import { ChevronRightIcon } from "@storybook/icons";
import { linkTo } from "@storybook/addon-links";
import { getDependenciesTree, getDependentsTree } from "../utils/getTree.js";
export const Accordion = ({ depList, treeMode }) => {
    return (React.createElement(Table, null, treeMode ? React.createElement(RecursiveDependencies, { depList: depList }) : React.createElement(RecursiveDependents, { depList: depList })));
};
const RecursiveDependencies = ({ depList }) => {
    return depList.map((depTitle) => {
        const dep = getDependenciesTree(depTitle);
        if (dep.length === 0) {
            return React.createElement(Row, { name: depTitle, key: depTitle });
        }
        else {
            return (React.createElement(ContainerRow, { name: depTitle, key: depTitle },
                React.createElement(RecursiveDependencies, { depList: dep })));
        }
    });
};
const RecursiveDependents = ({ depList }) => {
    return depList.map((depTitle) => {
        const dep = getDependentsTree(depTitle);
        if (dep.length === 0) {
            return React.createElement(Row, { name: depTitle, key: depTitle });
        }
        else {
            return (React.createElement(ContainerRow, { name: depTitle, key: depTitle },
                React.createElement(RecursiveDependents, { depList: dep })));
        }
    });
};
const ContainerRow = ({ name, children }) => {
    const [open, setOpen] = useState(false);
    return (React.createElement(React.Fragment, null,
        React.createElement(RowDiv, { "$isOpen": open, onClick: () => {
                setOpen(!open);
            } },
            React.createElement(ChevronRightIcon, null),
            React.createElement(Anchor, { name: name })),
        React.createElement(RowsContainer, { "$isOpen": open },
            React.createElement("div", { style: { overflow: "hidden" } }, children))));
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
