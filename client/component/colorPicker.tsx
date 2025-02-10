import React from "react";
import { useState } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState("");

  return (
    <>
      <h1 style={{ color: color }}>My favorite color is: {color}</h1>
      <button type="button" onClick={() => setColor("blue")}>
        Blue
      </button>
      <button type="button" onClick={() => setColor("red")}>
        Red
      </button>
      <button type="button" onClick={() => setColor("pink")}>
        Pink
      </button>
      <button type="button" onClick={() => setColor("green")}>
        Green
      </button>
    </>
  );
}
