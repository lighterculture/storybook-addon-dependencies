import React from "react";
import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/blocks";
import { Dependencies } from "./components/Dependencies.js";
import { Dependents } from "./components/Dependents.js";

const preview: ProjectAnnotations<Renderer> = {
  parameters: {
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Dependencies />
            <Dependents />
            <Primary />
            <Controls />
            <Stories />
          </>
        );
      },
    },
  },
};

export default preview;
