"use client";
import { useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(100);
  return (
    <div>
      <h1>Hello From Pluralsight!</h1>
      <h1>
        <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      </h1>
    </div>
  );
}
