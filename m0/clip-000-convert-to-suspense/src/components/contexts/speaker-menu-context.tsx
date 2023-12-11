'use client'

import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of the context's value
interface SpeakerMenuContextProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with the defined shape
const SpeakerMenuContext = createContext<SpeakerMenuContextProps | undefined>(
  undefined,
);

export default function SpeakerMenuProvider({
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
    <SpeakerMenuContext.Provider value={value}>
      {children}
    </SpeakerMenuContext.Provider>
  );
}

export function useSpeakerMenuContext() {
  // Use the correct context
  const context = useContext(SpeakerMenuContext);
  if (!context) {
    throw new Error(
      "useSpeakerMenuContext must be used within a SpeakerMenuProvider",
    );
  }
  return context;
}
