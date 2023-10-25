import React from "react";

export default function ButtonForm({ ...props }) {
  return (
    <div>
      <button
        style={{
          width: 120,
          height: 45,
          border: "none",
          borderRadius: 5,
          backgroundColor: "#067cc9",
          display: "block",
          margin: "0 15px",
        }}
        onClick={props.onClick}
        type={props.type}
      >
        {props.children}
      </button>
    </div>
  );
}
