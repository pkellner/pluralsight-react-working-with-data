"use client";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(100);
  return (
    <div>
      <div>Hello from Pluralsight!</div>
      <h1>
        <button onClick={() => setCounter(counter + 1)}>
          Click Me! {counter}
        </button>
      </h1>
    </div>
  );
}
