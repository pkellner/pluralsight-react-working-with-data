"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function DeleteAttendee() {
  const { pending } = useFormStatus();

  const handleDeleteConfirmation = (event: any) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete all info for this attendee?"
    );

    // If not confirmed, prevent the form from submitting
    if (!isConfirmed) {
      event.preventDefault();
    }
    // If confirmed, form submission will proceed
  };

  if (pending)
    return (
      <button type="button" className="btn btn-primary mt-4" disabled>
        Updating...
      </button>
    );

  return (
    <button
      type="submit"
      className="btn btn-primary mt-4"
      onClick={handleDeleteConfirmation} // Added the onClick event handler for confirmation
    >
      DELETE
    </button>
  );
}
