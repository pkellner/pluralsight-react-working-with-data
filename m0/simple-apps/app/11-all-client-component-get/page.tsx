"use client";
import React, { useState, useEffect } from "react";
import { Attendee } from "@prisma/client";

function AttendeeList() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch("/api/attendee");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAttendees(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching data: ", error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees().then((r) => null);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="container mt-3">
      <h2>Attendee List</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
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
              <td>{attendee.id}</td>
              <td>{attendee.email}</td>
              <td>{attendee.firstName}</td>
              <td>{attendee.lastName}</td>
              <td>{new Date(attendee.created).toLocaleString()}</td>
              <td>{new Date(attendee.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendeeList;
