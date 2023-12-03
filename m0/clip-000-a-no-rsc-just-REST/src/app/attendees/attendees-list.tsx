import React, { useEffect, useState } from "react";
import { Attendee } from "@/lib/general-types";
import { useAttendeeMenuContext } from "@/components/contexts/attendee-menu-context";
import useAttendeeSortAndFilter from "@/app/attendees/use-attendee-sort-and-filter";
import AttendeeDetailPending from "@/app/attendees/attendee-detail-pending";
import AttendeeDetail from "@/app/attendees/attendee-detail";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AttendeesList({
  attendeesList,
  setAttendeesList,
  loadingStatus,
  setLoadingStatus,
  error,
  setError,
}: {
  attendeesList: Attendee[];
  setAttendeesList: (attendeeList: Attendee[]) => void;
  loadingStatus: string;
  setLoadingStatus: (loadingStatus: string) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
}) {
  const { searchText } = useAttendeeMenuContext();

  function updateAttendee(attendee: Attendee, completionFunction: () => void) {
    async function update() {
      try {
        const response = await fetch(`/api/speakers/${attendee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendee),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const updatedAttendee = await response.json();
        setAttendeesList(
          attendeesList.map((attendee) =>
            attendee.id === updatedAttendee.id ? updatedAttendee : attendee,
          ),
        );
        completionFunction();
        return updatedAttendee;
      } catch (error) {
        console.error("Error updating attendee:", error);
        throw error;
      }
    }
    update().then(() => {});
  }

  function createAttendee(attendee: Attendee) {
    async function create() {
      try {
        const response = await fetch(`/api/attendees/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendee),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const newAttendee = await response.json(); // Read the response once
        setAttendeesList([...attendeesList, newAttendee]);

        // No need to call response.json() again, newSpeaker already holds the parsed response
        return newAttendee;
      } catch (error) {
        console.error("Error creating new attendee:", error);
        throw error;
      }
    }
    create().then(() => {});
  }

  function deleteAttendee(id: string) {
    async function deleteAttendeeInternal() {
      try {
        const response = await fetch(`/api/attendees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        if (response.status === 204) {
          setAttendeesList(
            attendeesList.filter((attendee: Attendee) => attendee.id !== id),
          );
          return null;
        } else {
          return await response.json();
        }
      } catch (error) {
        console.error("Error deleting attendee:", error);
        throw error;
      }
    }

    deleteAttendeeInternal().then(() => {});
  }

  useEffect(() => {
    async function fetchAttendees() {
      try {
        const response = await fetch("/api/attendees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000);
        setAttendeesList(data);
        setLoadingStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch AttendeesList", err);
          setError(err.message);
        } else {
          console.error("An unexpected error occurred");
          setError("An unexpected error occurred");
        }
        setLoadingStatus("error");
      }
    }
    fetchAttendees().then(() => {});
  }, []);

  const attendeeListFiltered = useAttendeeSortAndFilter(
    attendeesList,
    searchText,
  );

  if (loadingStatus === "loading") {
    return (
      <>
        {[1, 2, 3, 4, 5].map((item) => {
          return <AttendeeDetailPending key={item} />;
        })}
        <div className="mt-3"></div>
      </>
    );
  }

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  return (
    <>
      {attendeeListFiltered.map(function (attendeeRec) {
        return (
          <AttendeeDetail
            key={attendeeRec.id}
            attendeeRec={attendeeRec}
            createAttendee={createAttendee}
            deleteAttendee={deleteAttendee}
            updateAttendee={updateAttendee}
          />
        );
      })}
      <div className="mt-3"></div>
    </>
  );
}
