import React from "react";

export default function Button(props) {
  const myClass = `
  button ${props.type}`;

  return (
    <button
      className="p-1 mb-4 font-extrabold border-4 border-pink-400 cursor-pointer bg-gradient-to-br hover:from-100vh-cyan to-100vh-purple"
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
}
