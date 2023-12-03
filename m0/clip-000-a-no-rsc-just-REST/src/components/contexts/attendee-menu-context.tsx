"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context's value
interface AttendeeMenuContextProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with the defined shape
const AttendeeMenuContext = createContext<AttendeeMenuContextProps>({
  searchText: "",
  setSearchText: () => {}, // Provide a no-op function for initialization
});

export default function AttendeeMenuProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const value = {
    searchText,
    setSearchText,
  };

  return (
    <AttendeeMenuContext.Provider value={value}>
      {children}
    </AttendeeMenuContext.Provider>
  );
}

export function useAttendeeMenuContext() {
  // Use the correct context
  const context = useContext(AttendeeMenuContext);
  if (!context) {
    throw new Error(
      "useAttendeeMenuContext must be used within a AttendeeMenuProvider",
    );
  }
  return context;
}
