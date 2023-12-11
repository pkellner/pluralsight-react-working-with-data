"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Speaker } from "@/lib/general-types";
import {
  createSpeakerAction,
  deleteSpeakerAction,
  updateSpeakerAction,
} from "@/components/contexts/speaker-data-context-actions";
import { createSpeakerRecord } from "@/lib/speaker-utils";

// Define the shape of the context's value

type LoadingStatusType = "loading" | "success" | "error";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SpeakerDataContextProps {
  speakerList: Speaker[];
  setSpeakerList: (speakerList: Speaker[]) => void;
  updateSpeaker: (
    speakerRec: Speaker,
    attendeeId: string | undefined,
    completionFunction: () => void,
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
  speakerListInit,
}: {
  children: ReactNode;
  speakerListInit: Speaker[];
}) {
  const [speakerList, setSpeakerList] = useState<Speaker[]>(speakerListInit);

  function createSpeaker(speaker: Speaker, completionFunction: () => void) {
    async function create() {
      // make sure no id is passed in
      const speakerToAdd: Speaker = { ...speaker, id: 0 };
      try {
        // SHOULD BE DOING ZOD THING HERE
        const newSpeaker = await createSpeakerAction(speakerToAdd);
        setSpeakerList([...speakerList, newSpeaker]);
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
        // SHOULD BE DOING ZOD THING HERE
        await deleteSpeakerAction(id);

        setSpeakerList(
          speakerList.filter((speaker: Speaker) => speaker.id !== id),
        );
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
