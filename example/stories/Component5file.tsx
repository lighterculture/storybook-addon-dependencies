import React from "react";
import { Component7 } from "./Component7";

export const Component5 = () => {
  return <div>Component5</div>;
};

export const Component6 = () => {
  return (
    <div>
      Component5
      <div>
        <Component7 />
      </div>
    </div>
  );
};
