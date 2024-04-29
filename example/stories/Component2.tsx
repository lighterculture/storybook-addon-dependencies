import React from "react";
import { Component3 } from "./Component3";

export const Component2 = () => {
  return (
    <div className="component-addon-dep" style={{ background: "#76c893" }}>
      Component2
      <div>
        <Component3 />
      </div>
    </div>
  );
};
