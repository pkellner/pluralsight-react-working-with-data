"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Speaker } from "@/lib/general-types";
import { updateSpeakerAction } from "@/components/contexts/speaker-data-context-actions";

// Define the shape of the context's value

type LoadingStatusType = "loading" | "success" | "error";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SpeakerDataContextProps {
  speakerList: Speaker[];
  setSpeakerList: (speakerList: Speaker[]) => void;
  // error: string | undefined;
  // setError: (error: string | undefined) => void;
  // loadingStatus: LoadingStatusType;
  // setLoadingStatus: (loadingStatus: LoadingStatusType) => void;
  updateSpeaker: (
    speakerRec: Speaker,
    attendeeId: string | undefined,
    completionFunction: () => void,
  ) => void;
  createSpeaker: (speakerRec: Speaker, completionFunction: () => void) => void;
  deleteSpeaker: (id: number, completionFunction: () => void) => void;
  //getSpeakerPromise: () => Promise<Speaker[]>;
}

// Create the context with the defined shape
const SpeakerDataContext = createContext<SpeakerDataContextProps | undefined>(
  undefined,
);

export default function SpeakerDataProvider({
  children,
  speakerListInit,
}: {
  children: ReactNode;
  speakerListInit: Speaker[];
}) {
  const [speakerList, setSpeakerList] = useState<Speaker[]>(speakerListInit);
  // const [loadingStatus, setLoadingStatus] =
  //   useState<LoadingStatusType>("loading");
  // const [error, setError] = useState<string | undefined>();

  // useEffect(() => {
  //   async function fetchSpeakers() {
  //     try {
  //       const response = await fetch("/api/speakers");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       await sleep(1000);
  //
  //       setSpeakerList(
  //         data.map((speaker: Speaker) => {
  //           return speaker;
  //         }),
  //       );
  //       setLoadingStatus("success");
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.error("Error in fetch SpeakersList", err);
  //         setError(err.message);
  //       } else {
  //         console.error("An unexpected error occurred");
  //         setError("An unexpected error occurred");
  //       }
  //       setLoadingStatus("error");
  //     }
  //   }
  //   fetchSpeakers().then(() => {});
  // }, []);

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
        setSpeakerList([...speakerList, newSpeaker]);

        // No need to call response.json() again, newSpeaker already holds the parsed response
        return newSpeaker;
      } catch (error) {
        console.error("Error creating new speaker:", error);
        throw error;
      }
    }
    create().then(() => {
      completionFunction();
    });
  }

  // this is included here because it is used in the SpeakerMenu component from add-speaker-dialog.tsx.
  // that uses the same window for both create and updated, even though it is only used in add mode from that component.
  function updateSpeaker(
    speaker: Speaker,
    attendeeId: string | undefined,
    completionFunction: () => void,
  ) {
    async function update() {
      try {
        if (
          speaker.timeSpeaking === undefined ||
          speaker.timeSpeaking === null
        ) {
          speaker.timeSpeaking = new Date(0);
        }

        // SHOULD BE DOING ZOD THING HERE
        const ret = await updateSpeakerAction(speaker.id, speaker, attendeeId);
        const updatedSpeaker = ret.updatedSpeaker;
        const originalSpeaker = ret.originalSpeaker;

        console.log(
          "speaker-data-context.tsx: originalSpeaker: ",
          originalSpeaker,
          "updatedSpeaker:",
          updatedSpeaker,
        );

        // check to see if favorite has changed
        if (originalSpeaker?.favorite !== speaker?.favorite) {
          const tempList: Speaker[] = speakerList.map(function (speaker) {
            if (
              speaker.id === originalSpeaker?.id &&
              updatedSpeaker !== undefined &&
              updatedSpeaker !== null
            ) {
              return updatedSpeaker;
            } else {
              return speaker;
            }
          });
          setSpeakerList(tempList);
        }

        return updatedSpeaker;
      } catch (error) {
        console.error("Error updating speaker:", error);
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

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // Check if the response status is 204 (No Content)
        if (response.status === 204) {
          setSpeakerList(
            speakerList.filter((speaker: Speaker) => speaker.id !== id),
          );
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
      completionFunction();
    });
  }

  const value = {
    speakerList,
    setSpeakerList,
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
