"use client";
import React from "react";
import { useAttendeeMenuContext } from "@/components/contexts/attendee-menu-context";
import useAttendeeSortAndFilter from "@/components/hooks/use-attendee-sort-and-filter";
import AttendeeDetail from "@/app/attendees/attendee-detail";
import { useAttendeeDataContext } from "@/components/contexts/attendee-data-context";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AttendeesList() {
  const { searchText } = useAttendeeMenuContext();

  const { updateAttendee, createAttendee, deleteAttendee, attendeeList } =
    useAttendeeDataContext();

  const attendeeListFiltered = useAttendeeSortAndFilter(
    attendeeList,
    searchText,
  );

  return (
    <>
      {/* Headers */}
      <div className="col-12">
        <div className="card border-0">
          <div className="row g-2 align-items-center border-bottom">
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-2 col-md-1">Action</div>{" "}
            {/* Header for the new button column */}
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-6 col-md-3">Name / Email</div>
            {/* Hidden on xs screens, visible and adjusted on md and larger */}
            <div className="col-md-3 d-none d-md-block">
              Date Created {/* Assuming this is the header for Date Created */}
            </div>
            {/* Hidden on xs screens, visible and adjusted on md and larger */}
            <div className="col-md-2 d-none d-md-block">
              ID {/* Assuming this is the header for ID */}
            </div>
            {/* For xs screens, each takes 1/3 of the width; adjusted for md screens */}
            <div className="col-4 col-md-3">Operations</div>
          </div>
        </div>
      </div>

      {/* Mapping over attendeeListFiltered */}
      {attendeeListFiltered
        .sort((a, b) => {
          // Sort 'admin' to the top
          if (a.lastName.toLowerCase() === "admin") return -1;
          if (b.lastName.toLowerCase() === "admin") return 1;

          return 0; // sort comes from prisma query
        })
        .map(function (attendeeRec) {
          return (
            <div className="col-12" key={attendeeRec.id}>
              <div className="card border-0 h-100">
                <AttendeeDetail
                  attendeeRec={attendeeRec}
                  createAttendee={createAttendee}
                  deleteAttendee={deleteAttendee}
                  updateAttendee={updateAttendee}
                />
              </div>
            </div>
          );
        })}
      <div className="mt-3"></div>
    </>
  );
}