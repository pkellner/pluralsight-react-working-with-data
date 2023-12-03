"use client";
import React, { useState } from "react";
import { Attendee } from "@/lib/general-types";
import AttendeeMenuProvider from "@/components/contexts/attendee-menu-context";
import AttendeeMenu from "@/app/attendees/attendee-menu";
import AttendeesList from "@/app/attendees/attendees-list";
import LocalAuthProvider from "@/components/contexts/auth-context";

export default function AttendeesListContainer() {
  const [attendeesList, setAttendeesList] = useState<Attendee[]>([]);

  const [loadingStatus, setLoadingStatus] = useState("loading"); // default to loading
  const [error, setError] = useState<string | undefined>(); // error state

  return (

    <AttendeeMenuProvider>
      <AttendeeMenu />
      <div className="container">
        <div className="row g-4">
          <AttendeesList
            attendeesList={attendeesList}
            setAttendeesList={setAttendeesList}
            loadingStatus={loadingStatus}
            setLoadingStatus={setLoadingStatus}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </AttendeeMenuProvider>

  );
}
