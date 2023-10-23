import React from "react";

export default function ButtonForm(props) {
  return (
    <div>
      <button
        style={{
          width: 120,
          height: 45,
          border: "none",
          borderRadius: 5,
          backgroundColor: "blue",
          display: "block",
          margin: "0 15px",
        }}
      >
        {props.children}
      </button>
    </div>
  );
}
