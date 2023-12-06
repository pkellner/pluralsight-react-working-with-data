"use client";
import React, {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import {Speaker} from "@/lib/general-types";

// Define the shape of the context's value

type LoadingStatusType = "loading" | "success" | "error";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SpeakerDataContextProps {
  speakerList: Speaker[];
  setSpeakerList: (speakerList: Speaker[]) => void;
  error: string | undefined;
  setError: (error: string | undefined) => void;
  loadingStatus: LoadingStatusType;
  setLoadingStatus: (loadingStatus: LoadingStatusType) => void;
  updateSpeaker: (speakerRec: Speaker, completionFunction: () => void) => void;
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
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>("loading");
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch("/api/speakers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000);

        setSpeakerList(
          data.map((speaker: Speaker) => {
            return speaker;
          }),
        );

        // setSpeakerList(
        //   data.map((speaker: Speaker) => {
        //
        //     const newSpeaker : Speaker = {
        //       ...speaker,
        //       favoriteCountDisplayStatus: "updating",
        //     };
        //     console.log("speaker-data-context: newSpeaker", newSpeaker);
        //     return (newSpeaker);
        //   }),
        // );
        // console.log(speakerList);
        setLoadingStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch SpeakersList", err);
          setError(err.message);
        } else {
          console.error("An unexpected error occurred");
          setError("An unexpected error occurred");
        }
        setLoadingStatus("error");
      }
    }
    fetchSpeakers().then(() => {});
  }, []);

  function createSpeaker(speaker: Speaker, completionFunction: () => void) {
    async function create() {
      // make sure no id is passed in
      const speakerToAdd: Speaker = { ...speaker, id: 0 };
      console.log("createSpeaker: speakerToAdd:",speakerToAdd);
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
  function updateSpeaker(speaker: Speaker, completionFunction: () => void) {
    async function update() {
      try {
        // first get original speaker data so can check and see if favorite has changed
        const responseSingleSpeaker = await fetch(
          `/api/speakers/${speaker.id}`,
        );
        if (!responseSingleSpeaker.ok) {
          throw new Error(
            `Network response was not ok for fetch /api/speakers/${speaker.id}`,
          );
        }

        // now update the speaker
        const response = await fetch(`/api/speakers/${speaker.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        // check to see if favorite has changed
        const originalSpeaker = await responseSingleSpeaker.json();
        if (originalSpeaker?.favorite !== speaker?.favorite) {
          console.log("speaker-data-context: favorite has changed", originalSpeaker, speaker);
          // if favorite has changed, then need to update the speakerList
          // first remove the original speaker from the speakerList
          const filteredSpeakerList = speakerList.filter(
            (speaker) => speaker.id !== originalSpeaker.id,
          );

          // DO PROPER UPDATE TO PRISMA DB HERE
          // ..

          // now add the updated speaker to the speakerList
          setSpeakerList([...filteredSpeakerList, speaker]);
        }

        const updatedSpeaker = await response.json();
        setSpeakerList(
          speakerList.map((speaker) =>
            speaker.id === updatedSpeaker.id ? updatedSpeaker : speaker,
          ),
        );

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
    loadingStatus,
    setLoadingStatus,
    error,
    setError,
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
