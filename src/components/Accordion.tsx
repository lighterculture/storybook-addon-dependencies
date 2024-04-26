import React, { useState } from "react";
import { Link } from "@storybook/components";
import { RowDiv, Table, RowsContainer } from "./StyledStorybook.js";
import { ChevronRightIcon } from "@storybook/icons";
import { linkTo } from "@storybook/addon-links";
import { getDependenciesTree, getDependentsTree } from "../utils/getTree.js";

let getTree = getDependenciesTree;

export const Accordion = ({ depList, treeMode }) => {
  getTree = treeMode ? getDependenciesTree : getDependentsTree;
  return (
    <Table>
      <RecursiveRendering depList={depList} />
    </Table>
  );
};

const RecursiveRendering = ({ depList }) => {
  return depList.map((depTitle: any) => {
    const dep = getTree(depTitle);
    if (dep.length === 0) {
      return <Row name={depTitle} key={depTitle} />;
    } else {
      return <ContainerRow name={depTitle} depList={dep} key={depTitle} />;
    }
  });
};

const ContainerRow = ({ name, depList }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <RowDiv
        $isOpen={open}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ChevronRightIcon />
        <Anchor name={name} />
      </RowDiv>

      <RowsContainer $isOpen={open}>
        <div style={{ overflow: "hidden" }}>
          <RecursiveRendering depList={depList} />
        </div>
      </RowsContainer>
    </>
  );
};

export const Row = ({ name }) => (
  <RowDiv>
    <Anchor name={name} />
  </RowDiv>
);

const Anchor = ({ name }) => {
  const onClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div onClick={onClick}>
      <Link onClick={linkTo(name)}>{name}</Link>
    </div>
  );
};
