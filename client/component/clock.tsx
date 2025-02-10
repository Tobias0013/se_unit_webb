import React, { useState, useEffect } from "react";
import fetchTime from "../controller/fetchTime";

export default function render(): React.ReactNode {
  const secret = (event: React.MouseEvent) => {
    alert(`You found the secret! :D`);
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    setTimeout(async () => {
      const date = await fetchTime();
      setTime(date.date);
    }, 1000);
  });

  return (
    <>
      <h1 onClick={(event) => secret(event)}>What is the time?</h1>
      <h2>Time is: {time}</h2>
    </>
  );
}
