"use client";
import React, {
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
  setSpeakerState: React.Dispatch<React.SetStateAction<SpeakerState>>;
  updateSpeaker: (
    speakerRec: Speaker,
    completionFunction: () => void,
    errorFunction: () => void,
  ) => void;
  createSpeaker: (speakerRec: Speaker, completionFunction: () => void) => void;
  deleteSpeaker: (id: number, completionFunction: () => void) => void;
}

// Create the context with the defined shape
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
    async function fetchSpeakers() {
      try {
        const response = await fetch("/api/speakers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(500);

        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: data.map((speaker: Speaker) => {
            return speaker;
          }),
          loadingStatus: "success",
        }));
      } catch (err) {
        if (err instanceof Error) {
          const errorMessage = err.message || "An unexpected error occurred";
          setSpeakerState((prevState) => ({
            ...prevState,
            error: `fetchSpeakers - ${errorMessage}`,
            loadingStatus: "error",
          }));
        } else {
          console.error("An unexpected error occurred");
          setSpeakerState((prevState) => ({
            ...prevState,
            error: "fetchSpeakers - An unexpected error occurred",
            loadingStatus: "error",
          }));
        }
        setSpeakerState((prevState) => ({
          ...prevState,
          loadingStatus: "error",
        }));
      }
    }
    fetchSpeakers().then(() => {});
  }, []);

  function createSpeaker(speaker: Speaker, completionFunction: () => void) {
    async function create() {
      // make sure no id is passed in
      const speakerToAdd: Speaker = { ...speaker, id: 0 };
      try {
        const response = await fetch(`/api/speakers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speakerToAdd),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const newSpeaker = await response.json(); // Read the response once
        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: [...prevState.speakerList, newSpeaker],
        }));

        // No need to call response.json() again, newSpeaker already holds the parsed response
        return newSpeaker;
      } catch (error) {
        console.error("Error creating new speaker:", error);
        throw error;
      }
    }
    create().then(() => {
      if (completionFunction) {
        completionFunction();
      }
    });
  }

  // this is included here because it is used in the SpeakerMenu component from speaker-dialog-add.tsx.
  // that uses the same window for both create and updated, even though it is only used in add mode from that component.
  function updateSpeaker(
    speaker: Speaker,
    completionFunction: () => void,
    errorFunction?: () => void,
  ) {
    async function update() {
      try {
        // cleanup timeSpeaking
        if (
          speaker.timeSpeaking === undefined ||
          speaker.timeSpeaking === null
        ) {
          speaker.timeSpeaking = new Date(0);
        }

        // now update the speaker
        const response = await fetch(`/api/speakers/${speaker.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });
        if (response?.ok) {
          const updatedSpeakerRec = await response.json(); // Read the response once
          setSpeakerState((prevState) => ({
            ...prevState,
            speakerList: prevState.speakerList.map((speakerRec) =>
              speakerRec.id === speaker.id ? updatedSpeakerRec : speakerRec,
            ),
          }));
        } else {
          if (errorFunction) {
            await sleep(1000);
            errorFunction();
          }
        }
      } catch (error) {
        console.error("Error updating speaker:", error);
      }
    }
    update().then(() => {
      if (completionFunction) {
        completionFunction();
      }
    });
  }

  function deleteSpeaker(id: number, completionFunction: () => void) {
    async function deleteSpeakerInternal() {
      try {
        const response = await fetch(`/api/speakers/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
          setSpeakerState((prevState) => ({
            ...prevState,
            speakerList: prevState.speakerList.filter(
              (speaker: Speaker) => speaker.id !== id,
            ),
          }));
          return null; // Or a suitable message indicating successful deletion
        } else {
          // If response is not 204, then parse the JSON
          return await response.json();
        }
      } catch (error) {
        console.error("Error deleting speaker:", error);
        throw error;
      }
    }
    deleteSpeakerInternal().then(() => {
      if (completionFunction) {
        completionFunction();
      }
    });
  }

  const value = {
    speakerState,
    setSpeakerState,
    updateSpeaker,
    createSpeaker,
    deleteSpeaker,
  };

  return (
    <SpeakerDataContext.Provider value={value}>
      {children}
    </SpeakerDataContext.Provider>
  );
}

export function useSpeakerDataContext() {
  // Use the correct context
  const context = useContext(SpeakerDataContext);
  if (!context) {
    throw new Error(
      "useSpeakerDataContext must be used within a SpeakerDataProvider",
    );
  }
  return context;
}
