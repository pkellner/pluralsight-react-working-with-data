'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import {Attendee, Speaker} from "@/lib/general-types";
import {
  createAttendeeAction,
  deleteAttendeeAction,
  updateAttendeeAction
} from "@/components/contexts/attendee-data-context-actions";

interface AttendeeDataContextProps {
  attendeeList: Attendee[];
  setAttendeeList: (attendeeList: Attendee[]) => void;
  updateAttendee: (attendee: Attendee, completionFunction: () => void) => void;
  createAttendee: (attendee: Attendee, completionFunction: () => void) => void;
  deleteAttendee: (id: string, completionFunction: () => void) => void;
}

const AttendeeDataContext = createContext<AttendeeDataContextProps | undefined>(
  undefined,
);

export default function AttendeeDataProvider({
  children,
  attendeeListInit,
}: {
  children: ReactNode;
  attendeeListInit: Attendee[];
}) {
  const [attendeeList, setAttendeeList] = useState<Attendee[]>(attendeeListInit);

  function createAttendee(attendee: Attendee, completionFunction: () => void) {
    async function create() {
      try {
        const newAttendee = await createAttendeeAction(attendee);
        setAttendeeList([...attendeeList, newAttendee]);
      } catch (error) {
        console.error("Error creating new attendee:", error);
        throw error;
      }
    }
    create().then(() => {
      completionFunction();
    });
  }

  function updateAttendee(attendee: Attendee, completionFunction: () => void) {
    async function update() {
      try {
        const ret = await updateAttendeeAction(attendee.id,attendee);
        const updatedAttendee = ret.updatedAttendee;

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

      try {
        await deleteAttendeeAction(id);
        setAttendeeList(
          attendeeList.filter((attendee: Attendee) => attendee.id !== id),
        );
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
