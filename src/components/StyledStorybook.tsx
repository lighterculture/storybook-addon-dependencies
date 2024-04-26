import React from "react";
import type { Theme } from "@storybook/theming";
import { Heading } from "@storybook/blocks";
import { styled } from "@storybook/theming";
import { Div, H6 } from "@storybook/components";

export const getBlockBackgroundStyle: (theme: Theme) => object = (theme: Theme) => ({
  borderRadius: theme.appBorderRadius,
  background: theme.background.content,
  boxShadow: theme.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  border: `1px solid ${theme.appBorderColor}`,
});

export const Table: typeof Div = styled(Div)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  margin: "16px 0 40px",
  // padding: "5px 10px",
  ...getBlockBackgroundStyle(theme),
}));

export const RowDiv = styled.div<{
  $isOpen?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: ${(props) => props.theme.appBorderRadius};
  &:hover {
    background: ${(props) => props.theme.appBorderColor};
  }
  ${(props) => props.$isOpen !== undefined && `cursor: pointer`};
  & svg {
    transition: transform 200ms ease-out;
    & path {
      fill: ${(props) => props.theme.barTextColor};
    }
    ${(props) =>
      props.$isOpen &&
      `
    transform: rotate(90deg);
  `};
  }
`;

export const RowsContainer = styled.div<{
  $isOpen?: boolean;
}>`
  display: grid;
  padding-left: 20px;
  grid-template-rows: ${(props) => (props.$isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 200ms;
`;

export const StyledHeading: typeof Heading = styled(Heading)(({ theme }) => ({
  fontSize: `${theme.typography.size.s2 - 1}px`,
  fontWeight: theme.typography.weight.bold,
  lineHeight: "16px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: theme.textMutedColor,
  border: 0,
  "&:first-of-type": {
    // specificity issue
    marginTop: "50px",
  },
}));

export const EmptyDeps = ({ children }) => (
  <Table>
    <RowDiv>
      <H6 style={{ margin: 0 }}>{children}</H6>
    </RowDiv>
  </Table>
);
