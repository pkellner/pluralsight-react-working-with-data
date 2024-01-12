"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Speaker } from "@/lib/general-types";

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
  setSpeakerState: React.Dispatch<React.SetStateAction<SpeakerState>>;
  updateSpeaker: (speakerRec: Speaker, completionFunction: () => void) => void;
  createSpeaker: (speakerRec: Speaker, completionFunction: () => void) => void;
  deleteSpeaker: (id: number, completionFunction: () => void) => void;
}

// Create the context with the defined shape
const SpeakerDataContext = createContext<SpeakerDataContextProps | undefined>(
  undefined,
);

type SpeakerState = {
  speakerList: Speaker[];
  loadingStatus: "loading" | "success" | "error";
  error: string | undefined;
};

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

  function handleError(location: string, err: Error | unknown) {
    if (err instanceof Error) {
      const errorMessage = err.message || "An unexpected error occurred";
      setSpeakerState((prevState) => ({
        ...prevState,
        error: `${location} - ${errorMessage}`,
        loadingStatus: "error",
      }));
    } else {
      setSpeakerState((prevState) => ({
        ...prevState,
        error: "An unexpected error occurred - unknown error",
        loadingStatus: "error",
      }));
    }
  }

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        setSpeakerState((prevState) => ({
          ...prevState,
          loadingStatus: "loading",
        }));
        const response = await fetch("/api/speakers");
        const data = await response.json();
        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: data,
          loadingStatus: "success",
        }));
      } catch (err) {
        handleError("speaker fetch", err);
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
        const newSpeaker = await response.json(); // Read the response once

        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: [...prevState.speakerList, newSpeaker],
        }));

        // No need to call response.json() again, newSpeaker already holds the parsed response
        return newSpeaker;
      } catch (error) {
        handleError("speaker create", error);
      }
    }
    create().then(() => {
      completionFunction();
    });
  }

  // this is included here because it is used in the SpeakerMenu component from speaker-dialog-add.tsx.
  // that uses the same window for both create and updated, even though it is only used in add mode from that component.

  // this is included here because it is used in the SpeakerMenu component from speaker-dialog-add.tsx.
  // that uses the same window for both create and updated, even though it is only used in add mode from that component.
  function updateSpeaker(speaker: Speaker, completionFunction: () => void) {
    async function update() {
      try {
        // cleanup timeSpeaking
        if (
          speaker.timeSpeaking === undefined ||
          speaker.timeSpeaking === null
        ) {
          speaker.timeSpeaking = new Date(0);
        }

        // get original speaker data so can check and see if favorite has changed and have some hope of getting latest favoriteCount
        const responseOriginalSpeaker = await fetch(
          `/api/speakers/${speaker.id}`,
        );
        const originalSpeaker = await responseOriginalSpeaker.json();

        // now update the speaker
        const response = await fetch(`/api/speakers/${speaker.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });

        // check to see if favorite has changed
        if (originalSpeaker?.favorite !== speaker?.favorite) {
          // if favorite has changed, then need to update the speakerList
          // first remove the original speaker from the speakerList
          const filteredSpeakerList = speakerState.speakerList.filter(
            (speakerRec) => speakerRec.id !== speaker.id,
          );

          setSpeakerState((prevState) => ({
            ...prevState,
            speakerList: [...filteredSpeakerList, speaker],
          }));
        }

        const updatedSpeaker = await response.json();
        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: prevState.speakerList.map((speaker) =>
            speaker.id === updatedSpeaker.id ? updatedSpeaker : speaker,
          ),
        }));
        return updatedSpeaker;
      } catch (error) {
        console.error("Error updating speaker:", error);
        completionFunction();
        throw error;
      }
    }
    update().then(() => {
      completionFunction();
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
        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
          setSpeakerState((prevState) => ({
            ...prevState,
            speakerList: speakerState.speakerList.filter(
              (speaker: Speaker) => speaker.id !== id,
            ),
          }));

          return null; // Or a suitable message indicating successful deletion
        } else {
          // If response is not 204, then parse the JSON
          return await response.json();
        }
      } catch (error) {
        handleError("error deleting speaker", error);
      }
    }
    deleteSpeakerInternal().then(() => {
      completionFunction();
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
