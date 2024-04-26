import React from "react";
import type { Theme } from "@storybook/theming";
import { Heading } from "@storybook/blocks";
import { Div } from "@storybook/components";
export declare const getBlockBackgroundStyle: (theme: Theme) => object;
export declare const Table: typeof Div;
export declare const RowDiv: import("@storybook/theming").StyledComponent<{
    theme?: Theme;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
} & {
    $isOpen?: boolean;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const RowsContainer: import("@storybook/theming").StyledComponent<{
    theme?: Theme;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
} & {
    $isOpen?: boolean;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const StyledHeading: typeof Heading;
export declare const EmptyDeps: ({ children }: {
    children: any;
}) => React.JSX.Element;
