"use client";
import React, { Suspense, use } from "react";
import AttendeeModal from "@/app/24-all-client-component-suspense-handle-fetch-abort/attendee-modal";

export let abortController = new AbortController();

export default function AttendeesList({
  attendeesListPromise,
}: {
  attendeesListPromise: any;
}) {



  const attendeesList: any = use(attendeesListPromise);

  return (
    <table className="table table-striped table-hover table-bordered">
      <thead className="table-dark">
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Details</th>
        </tr>
      </thead>
      <tbody>
        {attendeesList.map((attendee: any) => {
          return (
            <tr key={attendee.id}>
              <td>{attendee.firstName}</td>
              <td>{attendee.lastName}</td>
              <td>
                <AttendeeModal attendee={attendee}>
                  <button className="btn btn-primary btn-sm">Detail</button>
                </AttendeeModal>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
