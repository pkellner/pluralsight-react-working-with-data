'use client';
import React from "react";
import { useAttendeeMenuContext } from "@/components/contexts/attendee-menu-context";

export default function AttendeeMenu() {
  const { searchText, setSearchText } = useAttendeeMenuContext();

  return (
    <div
      className="btn-toolbar"
      role="toolbar"
      aria-label="Speaker toolbar filter"
    >
      <div className="toolbar-trigger mb-3">
        <div className="toolbar-search p-0">
          <input
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
