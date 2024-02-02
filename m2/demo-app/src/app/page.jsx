"use client";

export default function Home() {
  return (
    <div className="container m-3">
      <h1>React Suspense and Loading States Examples</h1>

      <ul>
        <li>
          <a href="/demoLoadingState">Loading States</a>
        </li>
        <li>
          <a href={"/demoSuspense"}>Suspense</a>
        </li>
      </ul>
    </div>
  );
}
