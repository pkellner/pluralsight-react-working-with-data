"use client";
import React, {useEffect, useRef, useState} from "react";
import AttendeeModalDetail from "@/app/24-all-client-component-suspense-handle-fetch-abort/attendee-modal-detail";
import { abortController } from "@/app/24-all-client-component-suspense-handle-fetch-abort/attendees-list";
import { ErrorBoundary } from "react-error-boundary";
import {fetchAttendee} from "@/app/24-all-client-component-suspense-handle-fetch-abort/lib";

function fallbackRender({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: any;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export default function AttendeeModal({
  children,
  attendee,
}: {
  children: React.ReactNode;
  attendee: any;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Cleanup function to abort fetch when the component is unmounted
    return () => {
      if (abortControllerRef.current) {

        // @ts-ignore
        abortControllerRef.current.abort();
      }
    };
  }, []);



  // @ts-ignore
  const attendeePromise = fetchAttendee(attendee.id, abortControllerRef.signal);

  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        console.log("onReset called", details);
      }}
    >
      <div className="position-relative d-inline-block">
        <div
          onMouseEnter={() => {

            // @ts-ignore
            abortControllerRef.current = new AbortController();
            setShowPopup(true);
          }}
          onMouseLeave={() => {
            if (abortControllerRef.current) {

              // @ts-ignore
              abortControllerRef.current.abort();
            }

            setShowPopup(false);
          }}
        >
          {children}
        </div>
        {showPopup && <AttendeeModalDetail attendee={attendee} attendeePromise={attendeePromise} />}
      </div>
    </ErrorBoundary>
  );
}
