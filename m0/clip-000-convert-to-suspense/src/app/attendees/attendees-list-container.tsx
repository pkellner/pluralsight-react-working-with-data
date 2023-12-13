import React from "react";
import AttendeeMenuProvider from "@/components/contexts/attendee-menu-context";
import AttendeeMenu from "@/app/attendees/attendee-menu";
import AttendeesList from "@/app/attendees/attendees-list";
import AttendeeDataProvider from "@/components/contexts/attendee-data-context";
import { getAttendeeRecords } from "@/lib/attendee-utils";

export default async function AttendeesListContainer() {
  const attendeeList = await getAttendeeRecords();
  return (
    <AttendeeMenuProvider>
      <div className="container">
        <div className="row g-4">
          <AttendeeMenu />
          <AttendeeDataProvider attendeeListInit={attendeeList}>
            <AttendeesList />
          </AttendeeDataProvider>
        </div>
      </div>
    </AttendeeMenuProvider>
  );
}
