import React, { useState } from "react";
import { Link } from "@storybook/components";
import { RowDiv, Table, RowsContainer } from "./StyledStorybook.js";
import { ChevronRightIcon } from "@storybook/icons";
import { linkTo } from "@storybook/addon-links";
import { getDependenciesTree, getDependentsTree } from "../utils/getTree.js";

export const Accordion = ({ depList, treeMode }) => {
  return (
    <Table>
      {treeMode ? <RecursiveDependencies depList={depList} /> : <RecursiveDependents depList={depList} />}
    </Table>
  );
};

const RecursiveDependencies = ({ depList }) => {
  return depList.map((depTitle: any) => {
    const dep = getDependenciesTree(depTitle);
    if (dep.length === 0) {
      return <Row name={depTitle} key={depTitle} />;
    } else {
      return (
        <ContainerRow name={depTitle} key={depTitle}>
          <RecursiveDependencies depList={dep} />
        </ContainerRow>
      );
    }
  });
};

const RecursiveDependents = ({ depList }) => {
  return depList.map((depTitle: any) => {
    const dep = getDependentsTree(depTitle);
    if (dep.length === 0) {
      return <Row name={depTitle} key={depTitle} />;
    } else {
      return (
        <ContainerRow name={depTitle} key={depTitle}>
          <RecursiveDependents depList={dep} />
        </ContainerRow>
      );
    }
  });
};

const ContainerRow = ({ name, children }) => {
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
        <div style={{ overflow: "hidden" }}>{children}</div>
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
