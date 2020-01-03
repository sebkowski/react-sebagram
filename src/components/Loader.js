import React from "react";

import spinner from "./spinner.gif";

const LoadingIndicator = ({ height, divheight }) => {
  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        verticalAlign: "center",
        height: "100vh",
        backgroundColor: "lightblue"
      }}
    >
      <img src={spinner} height={height} alt="spinner" />
    </div>
  );
};
export default LoadingIndicator;
