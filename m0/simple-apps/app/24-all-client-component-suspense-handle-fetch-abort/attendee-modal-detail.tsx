"use client";
import React, { Suspense, use } from "react";
import AttendeeDisplay from "@/app/24-all-client-component-suspense-handle-fetch-abort/attendee-display";
import { fetchAttendee } from "@/app/24-all-client-component-suspense-handle-fetch-abort/lib";

import { ErrorBoundary } from "react-error-boundary";

export default function AttendeeModalDetail({ attendee, attendeePromise }: { attendee: any, attendeePromise: any }) {



  return (

      <Suspense
        fallback={
          <AttendeeDisplay
            attendee={{
              id: attendee.id,
              firstName: attendee.firstName,
              lastName: attendee.lastName,
            }}
          />
        }
      >
        <AttendeeDetailFull attendeePromise={attendeePromise} />
      </Suspense>

  );
}

function AttendeeDetailFull({ attendeePromise }: { attendeePromise: any }) {
  const attendee: any = use(attendeePromise);
  console.log("AttendeeDetailFull: attendee:", attendee);

  return (
    <div
      className="card position-absolute"
      style={{
        top: "150%",
        left: "70%",
        transform: "translateX(-50%)",
        zIndex: "1060",
        backgroundColor: "lightblue",
      }}
    >
      <AttendeeDisplay attendee={attendee} />
    </div>
  );
}
