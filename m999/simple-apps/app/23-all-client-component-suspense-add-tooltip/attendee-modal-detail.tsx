"use client";
import React, { Suspense, use } from "react";
import { fetchAttendee } from "@/app/23-all-client-component-suspense-add-tooltip/lib";
import AttendeeDisplay from "@/app/23-all-client-component-suspense-add-tooltip/attendee-display";

export default function AttendeeModalDetail({ attendee }: { attendee: any }) {
  const attendeePromise = fetchAttendee(attendee.id);

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
  console.log("attendee:", attendee);

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
