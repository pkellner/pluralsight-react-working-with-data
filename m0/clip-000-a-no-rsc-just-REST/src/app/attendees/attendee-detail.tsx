import React, { useState } from "react";
import { Attendee } from "@/lib/general-types";

export default function AttendeeDetail({
                                         attendeeRec,
                                         deleteAttendee,
                                         updateAttendee,
                                         createAttendee,
                                       } : any) {
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="col-12">
      <div className="card border-0 h-100">
        {/* Headers */}
        <div className="row g-0 align-items-center border-bottom">
          <div className="col-2">Action</div> {/* Header for the new button column */}
          <div className="col-2">Name</div>
          <div className="col-3">Date Created</div>
          <div className="col-2">ID</div>
          <div className="col-3">Operations</div>
        </div>
        {/* Data Rows */}
        <div className="row g-0 align-items-center">
          <div className="col d-flex">
            <div className="col-2">
              <button className="btn btn-outline-success btn-sm p-1">Set as Logged In</button> {/* New Button */}
            </div>
            <div className="col-2">
              <span>{attendeeRec.firstName}</span> <span>{attendeeRec.lastName}</span>
            </div>
            <div className="col-3">
              <span>{new Date(attendeeRec.createdDate).toLocaleString()}</span>
            </div>
            <div className="col-2">
              <span>{attendeeRec.id}</span>
            </div>
            <div className="col-3">
              {isEditing ? (
                <>
                  <button className="btn btn-outline-primary btn-sm p-1" onClick={() => updateAttendee(attendeeRec, handleCancel)}>Update</button>
                  <button className="btn btn-outline-secondary btn-sm p-1" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn btn-outline-primary btn-sm p-1" onClick={handleEdit}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm p-1" onClick={() => deleteAttendee(attendeeRec.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
