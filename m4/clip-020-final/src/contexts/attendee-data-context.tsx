import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Attendee } from "@/lib/general-types";

interface AttendeeDataContextProps {
  attendeeState: AttendeeState;
  setAttendeeState: React.Dispatch<React.SetStateAction<AttendeeState>>;
  updateAttendee: (attendee: Attendee, completionFunction: () => void) => void;
  createAttendee: (attendee: Attendee) => void;
  deleteAttendee: (id: string, completionFunction: () => void) => void;
}

const AttendeeDataContext = createContext<AttendeeDataContextProps | undefined>(
  undefined,
);

type AttendeeState = {
  attendeeList: Attendee[];
  loadingStatus: "loading" | "success" | "error";
  error: string | undefined;
};

export default function AttendeeDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const initialState: AttendeeState = {
    attendeeList: [],
    loadingStatus: "loading",
    error: undefined,
  };

  const [attendeeState, setAttendeeState] =
    useState<AttendeeState>(initialState);

  function handleError(location: string, err: Error | unknown) {
    if (err instanceof Error) {
      const errorMessage = err.message || "An unexpected error occurred";
      setAttendeeState((prevState) => ({
        ...prevState,
        error: `${location} - ${errorMessage}`,
        loadingStatus: "error",
      }));
    } else {
      setAttendeeState((prevState) => ({
        ...prevState,
        error: "An unexpected error occurred - unknown error",
        loadingStatus: "error",
      }));
    }
  }

  useEffect(() => {
    async function fetchAttendees() {
      try {
        const response = await fetch("/api/attendees");
        const data = await response.json();
        setAttendeeState((prevState) => ({
          ...prevState,
          attendeeList: data,
          loadingStatus: "success",
        }));
      } catch (err) {
        handleError("attendee fetch", err);
      }
    }
    fetchAttendees().then(() => {});
  }, []);

  function createAttendee(attendee: Attendee) {
    async function create() {
      function createGUID(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      try {
        const response = await fetch(`/api/attendees/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendee),
        });
        const newAttendee = await response.json();
        if (newAttendee.id.length === 0) {
          newAttendee.id = createGUID();
        }
        setAttendeeState((prevState) => ({
          ...prevState,
          attendeeList: [...prevState.attendeeList, newAttendee],
        }));
      } catch (error) {
        handleError("error creating attendee", error);
      }
    }
    create().then(() => {});
  }

  function updateAttendee(attendee: Attendee, completionFunction: () => void) {
    async function update() {
      try {
        console.log("updateAttendee", attendee);
        const response = await fetch(`/api/attendees/${attendee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
          body: JSON.stringify(attendee),
        });
        const updatedAttendee = await response.json();
        setAttendeeState((prevState) => ({
          ...prevState,
          attendeeList: prevState.attendeeList.map((existingAttendee) =>
            existingAttendee.id === updatedAttendee.id
              ? updatedAttendee
              : existingAttendee,
          ),
        }));
      } catch (error) {
        handleError("Error updating attendee", error);
      }
    }
    update().then(() => {
      completionFunction();
    });
  }

  function deleteAttendee(id: string, completionFunction: () => void) {
    async function deleteAttendeeInternal() {
      try {
        const response = await fetch(`/api/attendees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 204) {
          setAttendeeState((prevState) => ({
            ...prevState,
            attendeeList: prevState.attendeeList.filter(
              (existingAttendee) => existingAttendee.id !== id,
            ),
          }));
        } else {
          await response.json();
        }
      } catch (error) {
        handleError("Error deleting attendee", error);
      }
    }

    deleteAttendeeInternal().then(() => {
      completionFunction();
    });
  }

  const value = {
    attendeeState,
    setAttendeeState,
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
