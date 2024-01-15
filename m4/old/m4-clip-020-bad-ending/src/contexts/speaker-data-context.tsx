"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SpeakerDataContext = createContext(undefined);

export default function SpeakerDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  type LoadingStatusType = "loading" | "success" | "error";
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>("loading");
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function go() {
      try {
        const response = await fetch("/api/speakers");
        const data = await response.json();
        setSpeakerList(data);
        setLoadingStatus("success");
      } catch (error) {
        setLoadingStatus("error");
        if (error instanceof Error) {
          const errorMessage = error.message || "an unexpected error happened";
          setError(errorMessage);
        } else {
          setError("an unexpected error happened");
        }
      }
    }
    go();
  }, []);

  const value: any = { speakerList, loadingStatus };

  return (
    <SpeakerDataContext.Provider value={value}>
      {children}
    </SpeakerDataContext.Provider>
  );
}

export function useSpeakerDataContext() {
  const context = useContext(SpeakerDataContext);
  if (!context) {
    throw new Error("useSpeakerDataContext not defined");
  }
  return context;
}
