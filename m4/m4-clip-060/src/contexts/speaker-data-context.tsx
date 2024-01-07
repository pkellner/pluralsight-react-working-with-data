"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Speaker } from "@/lib/general-types";

type SpeakerState = {
  speakerList: Speaker[];
  loadingStatus: "loading" | "success" | "error";
  error: string | undefined;
};

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
}

const SpeakerDataContext = createContext<SpeakerDataContextProps | undefined>(
  undefined,
);

export default function SpeakerDataProvider({
  children,
}: {
  children: ReactNode;
}) {
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
  }, [speakerState]);

  return (
    <SpeakerDataContext.Provider value={{ speakerState }}>
      {children}
    </SpeakerDataContext.Provider>
  );
}

export function useSpeakerDataContext() {
  const context = useContext(SpeakerDataContext);
  if (!context) {
    throw new Error(
      "useSpeakerDataContext must be used within a SpeakerDataProvider",
    );
  }
  return context;
}
