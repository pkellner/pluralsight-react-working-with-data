"use client";
import React, { useState } from "react";
import AttendeeModalDetail from "@/app/23-all-client-component-suspense-add-tooltip/attendee-modal-detail";

export default function AttendeeModal({
  children,
  attendee,
}: {
  children: React.ReactNode;
  attendee: any;
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="position-relative d-inline-block">
      <div
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        {children}
      </div>
      {showPopup && (
        <AttendeeModalDetail attendee={attendee} />
      )}
    </div>
  );
}
