"use client";
import React, { useState, useEffect } from "react";
import { Attendee } from "@prisma/client";

type LoadingStatus = "loading" | "success" | "error";

function AttendeeList() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch("/api/attendee");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Attendee[] = await response.json();
        // Sort by last name, then by first name
        data.sort(
          (a, b) =>
            a.lastName.localeCompare(b.lastName) ||
            a.firstName.localeCompare(b.firstName)
        );
        setAttendees(data);
        setLoadingStatus("success");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching data: ", error);
          setLoadingStatus("error");
        }
      }
    };
    fetchAttendees().then(() => null);
  }, []);

  if (loadingStatus === "loading") return <div>Loading...</div>;
  if (loadingStatus === "error") return <div>Error fetching data.</div>;

  return (
    <div className="container mt-3">
      <h2>Attendee List</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {/*<th>ID</th>*/}
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr key={attendee.id} className="table-light">
              {/*<td>{attendee.id}</td>*/}
              <td>{attendee.email.slice(0, 15)}</td>
              <td>{attendee.firstName}</td>
              <td>{attendee.lastName}</td>
              <td>{new Date(attendee.created).toDateString()}</td>
              <td>{new Date(attendee.updatedAt).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeList;
