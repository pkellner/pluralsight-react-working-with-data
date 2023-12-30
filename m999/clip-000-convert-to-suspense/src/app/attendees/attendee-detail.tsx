import React, { useState } from "react";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import AttendeeForm from "@/app/attendees/attendee-form";
import { Attendee } from "@/lib/general-types";

export default function AttendeeDetail({
  attendeeRec,
  deleteAttendee,
  updateAttendee,
}: {
  attendeeRec: Attendee;
  deleteAttendee: (id: string, completionFunction: () => void) => void;
  updateAttendee: (attendee: Attendee, completionFunction: () => void) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { loggedInName, setLoggedInName } = useLocalAuthContext();
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    firstName: attendeeRec.firstName,
    lastName: attendeeRec.lastName,
    email: attendeeRec.email,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

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

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

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
            <AttendeeForm formData={formData} setFormData={setFormData} />
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
                disabled={!validateEmail(formData.email)}
                className="btn btn-outline-primary btn-sm p-1 m-1"
                onClick={() => {
                  setUpdating(true);
                  updateAttendee({ ...attendeeRec, ...formData }, () => {
                    setUpdating(false);
                    setIsEditing(false);
                  });
                }}
              >
                {updating ? "Updating..." : "Update"}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm p-1"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <div>
              {attendeeRec.firstName != "admin" ? (
                <>
                  <button
                    className="btn btn-outline-primary btn-sm p-1 m-1"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm p-1 m-1"
                    onClick={() => {
                      setDeleting(true);
                      deleteAttendee(attendeeRec.id, () => {
                        setDeleting(false);
                      });
                    }}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
