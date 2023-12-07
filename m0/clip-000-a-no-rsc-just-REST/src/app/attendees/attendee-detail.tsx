import React, { useState } from "react";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import AttendeeForm from "@/app/attendees/attendee-form";

export default function AttendeeDetail({
  attendeeRec,
  deleteAttendee,
  updateAttendee,
  createAttendee,
}: any) {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const { loggedInName, setLoggedInName } = useLocalAuthContext();

  // Function to handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  function getLoginName(firstName: string, lastName: string, id: string) {
    return `${firstName}/${lastName}/${id}`;
  }

  const firstLastId = getLoginName(
    attendeeRec.firstName,
    attendeeRec.lastName,
    attendeeRec.id,
  );

  return (
    <div className="row g-2 align-items-center">
      <div className="col d-flex">
        {/* Log In Button - Adjusted for xs screens */}
        <div className="col-2 col-md-1">
          <button
            className="btn btn-outline-success btn-sm p-1 m-1"
            onClick={() => {
              if (loggedInName.length > 0 && firstLastId === loggedInName) {
                setLoggedInName("");
              } else {
                setLoggedInName(firstLastId);
              }
            }}
          >
            {firstLastId.length > 0 && firstLastId === loggedInName
              ? "Log Out"
              : "Log In"}
          </button>{" "}
        </div>

        {isEditing ? (
          <div className="col-6 col-md-3">
            <AttendeeForm
              attendee={attendeeRec}
              onSave={updateAttendee}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="col-6 col-md-3">
            <span>{attendeeRec.firstName}</span>{" "}
            <span>{attendeeRec.lastName}</span> ({attendeeRec.email})
          </div>
        )}

        <div className="col-md-3 d-none d-md-block">
          <span>
            {new Date(attendeeRec.createdDate).toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>

        {/* ID - Hidden on xs screens, visible on md and larger */}
        <div className="col-md-2 d-none d-md-block">
          <span>{attendeeRec.id.slice(0, 10) + "..."}</span>
        </div>

        {/* Operations - Adjusted for xs screens */}
        <div className="col-4 col-md-3">
          {isEditing ? (
            <>
              <button
                className="btn btn-outline-primary btn-sm p-1 m-1"
                onClick={() => updateAttendee(attendeeRec, handleCancel)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-secondary btn-sm p-1"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="">
              <button
                className="btn btn-outline-primary btn-sm p-1 m-1"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm p-1 m-1"
                onClick={() => deleteAttendee(attendeeRec.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
