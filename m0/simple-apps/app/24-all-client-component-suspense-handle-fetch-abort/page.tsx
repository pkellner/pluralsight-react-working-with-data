"use client";

import { Suspense } from "react";
import {fetchAttendees} from "@/app/24-all-client-component-suspense-handle-fetch-abort/lib";
import AttendeesList from "@/app/24-all-client-component-suspense-handle-fetch-abort/attendees-list";


export default function App() {
  const attendeesListPromise = fetchAttendees();

  return (
    <div className="container mt-5">
      <Suspense fallback={<p>waiting for attendees...</p>}>
        <AttendeesList attendeesListPromise={attendeesListPromise} />
      </Suspense>
    </div>
  );
}
