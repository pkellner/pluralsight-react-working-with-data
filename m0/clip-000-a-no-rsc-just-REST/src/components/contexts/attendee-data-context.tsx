import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Attendee } from "@/lib/general-types";

type LoadingStatusType = "loading" | "success" | "error";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface AttendeeDataContextProps {
  attendeeList: Attendee[];
  setAttendeeList: (attendeeList: Attendee[]) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  loadingStatus: LoadingStatusType;
  setLoadingStatus: (loadingStatus: LoadingStatusType) => void;
  updateAttendee: (attendee: Attendee, completionFunction: () => void) => void;
  createAttendee: (attendee: Attendee) => void;
  deleteAttendee: (id: string, completionFunction: () => void) => void;
}

const AttendeeDataContext = createContext<AttendeeDataContextProps | undefined>(
  undefined,
);

export default function AttendeeDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [attendeeList, setAttendeeList] = useState<Attendee[]>([]);
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>("loading");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchAttendees() {
      try {
        const response = await fetch("/api/attendees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(500);

        setAttendeeList(data);
        setLoadingStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch AttendeeList", err);
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

        const newAttendee = await response.json();
        setAttendeeList([...attendeeList, newAttendee]);
      } catch (error) {
        console.error("Error creating new attendee:", error);
        throw error;
      }
    }
    create().then(() => {});
  }

  function updateAttendee(attendee: Attendee, completionFunction: () => void) {
    async function update() {
      try {
        const response = await fetch(`/api/attendees/${attendee.id}`, {
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
        setAttendeeList(
          attendeeList.map((existingAttendee) =>
            existingAttendee.id === updatedAttendee.id
              ? updatedAttendee
              : existingAttendee,
          ),
        );
      } catch (error) {
        console.error("Error updating attendee:", error);
        throw error;
      }
    }
    update().then(() => {
      completionFunction();
    });
  }

  function deleteAttendee(id: string, completionFunction: () => void) {
    async function deleteAttendeeInternal() {
      await sleep(1000);
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
          setAttendeeList(
            attendeeList.filter(
              (existingAttendee) => existingAttendee.id !== id,
            ),
          );
        } else {
          await response.json();
        }
      } catch (error) {
        console.error("Error deleting attendee:", error);
        throw error;
      }
    }

    deleteAttendeeInternal().then(() => {
      completionFunction();
    });
  }

  const value = {
    attendeeList,
    setAttendeeList,
    loadingStatus,
    setLoadingStatus,
    error,
    setError,
    updateAttendee,
    createAttendee,
    deleteAttendee,
  };

  return (
    <AttendeeDataContext.Provider value={value}>
      {children}
    </AttendeeDataContext.Provider>
  );
}

export function useAttendeeDataContext() {
  const context = useContext(AttendeeDataContext);
  if (!context) {
    throw new Error(
      "useAttendeeDataContext must be used within an AttendeeDataProvider",
    );
  }
  return context;
}
