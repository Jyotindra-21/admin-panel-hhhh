import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="loader"></span>
    </div>
  );
}
