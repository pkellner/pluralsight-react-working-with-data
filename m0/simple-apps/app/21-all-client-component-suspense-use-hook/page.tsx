"use client";

import { Suspense } from "react";
import  Message  from "@/app/21-all-client-component-suspense-use-hook/message";
import { fetchMessage } from "@/app/21-all-client-component-suspense-use-hook/lib";

export default function App() {
  const messagePromise = fetchMessage();
  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
