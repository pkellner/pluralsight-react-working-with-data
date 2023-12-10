"use client";
import React from "react";
import AttendeeMenuProvider from "@/components/contexts/attendee-menu-context";
import AttendeeMenu from "@/app/attendees/attendee-menu";
import AttendeesList from "@/app/attendees/attendees-list";
import AttendeeDataProvider from "@/components/contexts/attendee-data-context";

export default function AttendeesListContainer() {
  return (
    <AttendeeDataProvider>
      <AttendeeMenuProvider>
        <div className="container">
          <div className="row g-4">
            <AttendeeMenu />
            <AttendeesList />
          </div>
        </div>
      </AttendeeMenuProvider>
    </AttendeeDataProvider>
  );
}
