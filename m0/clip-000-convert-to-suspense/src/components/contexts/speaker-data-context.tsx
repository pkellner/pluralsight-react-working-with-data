"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useOptimistic,
  startTransition,
} from "react";
import { Speaker } from "@/lib/general-types";
import {
  createSpeakerAction,
  deleteSpeakerAction,
  updateSpeakerAction,
} from "@/components/contexts/speaker-data-context-actions";

interface SpeakerDataContextProps {
  speakerList: Speaker[];
  speakerListOptimistic: Speaker[];
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
  const [speakerListOptimistic, setSpeakerListOptimistic] =
    useOptimistic(speakerList);

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

  // this is included here because it is used in the SpeakerMenu component from speaker-dialog-add.tsx.
  // that uses the same window for both create and updated, even though it is only used in add mode from that component.
  function updateSpeaker(
    speaker: Speaker,
    attendeeId: string | undefined,
    completionFunction: () => void,
  ) {
    async function update() {
      try {
        speaker.timeSpeaking ??= new Date(0);

        startTransition(() => {
          setSpeakerListOptimistic(
            speakerListOptimistic.map((speakerRec: Speaker) => {
              if (speakerRec.id === speaker.id) {
                const favoriteCount = speakerRec.favoriteCount ?? 0;
                const speakerOptimistic = {
                  ...speakerRec,
                  favorite: !speakerRec.favorite,
                  favoriteCount: speakerRec.favorite
                    ? favoriteCount - 1
                    : favoriteCount + 1,
                };
                return speakerOptimistic;
              } else {
                return speakerRec;
              }
            }),
          );
        });

        // implement zod here
        const { originalSpeaker, updatedSpeaker } = await updateSpeakerAction(
          speaker,
          attendeeId,
        );

        setSpeakerList(
          speakerList.map((speakerRec) =>
            speakerRec.id === originalSpeaker?.id
              ? updatedSpeaker ?? speakerRec
              : speakerRec,
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
    speakerListOptimistic,
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
