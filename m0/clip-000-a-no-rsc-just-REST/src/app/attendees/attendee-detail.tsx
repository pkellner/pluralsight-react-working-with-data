import React from "react";
import { Attendee } from "@/lib/general-types";

export default function AttendeeDetail({
  attendeeRec,
  deleteAttendee,
  updateAttendee,
  createAttendee,
}: {
  attendeeRec: any;
  deleteAttendee: (id: string) => void;
  updateAttendee: (attendee: Attendee, completionFunction: () => void) => void;
  createAttendee: (attendee: Attendee) => void;
}) {
  return (
    <div className="col-xl-6 col-md-12">
      <div className="card border-0 h-100">
        <div className="row g-0">
          <div className="col-8 d-flex flex-column flex-nowrap">
            <div className="card-body">
              <div className="attendee-action d-flex">
                <div className="modifyWrapper">
                  <button className="btn btn-outline-secondary btn-sm">
                    delete
                  </button>
                  {/* Additional functionality can be added here if needed */}
                  {/*<DeleteAttendeeButton*/}
                  {/*  id={attendeeRec.id}*/}
                  {/*  deleteAttendee={deleteAttendee}*/}
                  {/*/>*/}
                </div>
              </div>
              <h4 className="card-title">
                {attendeeRec.firstName} {attendeeRec.lastName}
              </h4>
              <p className="card-text">{attendeeRec.email}</p>
            </div>

            <div className="card-footer text-muted d-flex flex-wrap justify-content-between align-items-center">
              <small>
                <strong>Created Date:</strong>{" "}
                {new Date(attendeeRec.createdDate).toLocaleString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
