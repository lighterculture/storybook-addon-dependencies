import React from "react";
import { NoStoryComponent } from "./NoStoryComponent";

export const Component3 = () => {
  return (
    <div className="component-addon-dep" style={{ background: "#b5e48c" }}>
      Component3
      <div>
        <NoStoryComponent />
      </div>
    </div>
  );
};
