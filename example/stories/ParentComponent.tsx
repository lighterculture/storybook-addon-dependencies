import React from "react";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";
import { Component3 } from "./Component3";
import "./Components.css";

interface Props {
  prop1?: string;
  prop2?: string;
  prop3?: string;
}

export const ParentComponent = ({ prop1, prop2, prop3 }: Props) => {
  return (
    <div
      className="component-addon-dep"
      style={{
        background: "#168aad",
      }}
    >
      Parent Component
      <div>
        <Component1 />
        <Component2 />
        <Component3 />
      </div>
    </div>
  );
};
