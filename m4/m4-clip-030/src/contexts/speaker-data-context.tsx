'use client';
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

const SpeakerDataContext = createContext<any>(undefined);

export default function SpeakerDataProvider({
  children,
}: {
    children: ReactNode;
  }) {
  
  type SpeakerState = {
    speakerList: Speaker[];
    loadingStatus: "loading" | "success" | "error";
    error: string | undefined;
  };

  const initialState: SpeakerState = {
    speakerList: [],
    loadingStatus: "loading",
    error: undefined,
  };

  const [speakerState, setSpeakerState] = useState<SpeakerState>(initialState);

  useEffect(() => {
    async function go() {
      try {
        const response = await fetch("/api/speakers");
        const data = await response.json();
        setSpeakerState({
          speakerList: data,
          loadingStatus: "success",
          error: undefined,
        });
      } catch (error) {
        setSpeakerState({
          ...speakerState,
          loadingStatus: "error",
          error:
            error instanceof Error
              ? error.message ?? "an unexpected error happened"
              : "an unexpected error happened",
        });
      }
    }
    go();
  }, []);
  
  return (
    <SpeakerDataContext.Provider value={
      {speakerState}
     }>
      {children}
    </SpeakerDataContext.Provider>
  )
  
}



export function useSpeakerDataContext() {
  const context = useContext(SpeakerDataContext);
  return context;
}