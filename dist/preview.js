import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import { Dependencies } from "./components/Dependencies.js";
import { Dependents } from "./components/Dependents.js";
const preview = {
    parameters: {
        docs: {
            page: () => {
                return (React.createElement(React.Fragment, null,
                    React.createElement(Title, null),
                    React.createElement(Subtitle, null),
                    React.createElement(Description, null),
                    React.createElement(Dependencies, null),
                    React.createElement(Dependents, null),
                    React.createElement(Primary, null),
                    React.createElement(Controls, null),
                    React.createElement(Stories, null)));
            },
        },
    },
};
export default preview;
