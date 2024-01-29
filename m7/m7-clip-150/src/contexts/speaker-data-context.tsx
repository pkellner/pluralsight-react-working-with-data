"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Speaker } from "@/lib/general-types";
import {
  createSpeakerAction,
  deleteSpeakerAction,
  updateSpeakerAction,
} from "@/contexts/speaker-data-context-actions";

type SpeakerState = {
  speakerList: Speaker[];
};

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms),
  );

interface SpeakerDataContextProps {
  speakerState: SpeakerState;
  setSpeakerState: React.Dispatch<
    React.SetStateAction<SpeakerState>
  >;
  updateSpeaker: (
    speakerRec: Speaker,
    completionFunction: () => void,
    errorFunction?: (
      message: string,
    ) => void,
  ) => void;
  createSpeaker: (
    speakerRec: Speaker,
    completionFunction: () => void,
  ) => void;
  deleteSpeaker: (
    id: number,
    completionFunction: () => void,
  ) => void;
}

// Create the context with the defined shape
const SpeakerDataContext = createContext<
  SpeakerDataContextProps | undefined
>(undefined);

export default function SpeakerDataProvider({
  children,
  speakerListInit,
}: {
  children: ReactNode;
  speakerListInit: Speaker[];
}) {
  const initialState: SpeakerState = {
    speakerList: speakerListInit,
  };

  const [speakerState, setSpeakerState] =
    useState<SpeakerState>(initialState);

  function createSpeaker(
    speaker: Speaker,
    completionFunction: () => void,
  ) {
    async function create() {
      // make sure no id is passed in
      const speakerToAdd: Speaker = {
        ...speaker,
        id: 0,
      };

      try {
        const newSpeaker =
          await createSpeakerAction(
            speakerToAdd,
          );
        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList: [
            ...prevState.speakerList,
            newSpeaker,
          ],
        }));
        return newSpeaker;
      } catch (error) {
        console.error(
          "Error creating new speaker:",
          error,
        );
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
    errorFunction?: (val: string) => void,
  ) {
    async function update() {
      try {
        // cleanup timeSpeaking
        if (
          speaker.timeSpeaking ===
            undefined ||
          speaker.timeSpeaking === null
        ) {
          speaker.timeSpeaking = new Date(0);
        }

        // implement zod here
        const {
          originalSpeaker,
          updatedSpeaker,
        } =
          await updateSpeakerAction(speaker);

        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList:
            prevState.speakerList.map(
              (speakerRec) =>
                speakerRec.id ===
                  speaker.id &&
                updatedSpeaker != null
                  ? updatedSpeaker
                  : speakerRec,
            ),
        }));
      } catch (error: unknown) {
        console.error(
          "Error updating speaker:",
          error,
        );
        if (errorFunction) {
          errorFunction(
            (error as { message: string })
              .message,
          );
        }
      }
    }
    update().then(() => {
      if (completionFunction) {
        completionFunction();
      }
    });
  }

  function deleteSpeaker(
    id: number,
    completionFunction: () => void,
  ) {
    async function deleteSpeakerInternal() {
      try {
        // SHOULD BE DOING ZOD THING HERE
        await deleteSpeakerAction(id);
        setSpeakerState((prevState) => ({
          ...prevState,
          speakerList:
            prevState.speakerList.filter(
              (speaker: Speaker) =>
                speaker.id !== id,
            ),
        }));
        return null; // Or a suitable message indicating successful deletion
      } catch (error) {
        console.error(
          "Error deleting speaker:",
          error,
        );
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
    <SpeakerDataContext.Provider
      value={value}
    >
      {children}
    </SpeakerDataContext.Provider>
  );
}

export function useSpeakerDataContext() {
  // Use the correct context
  const context = useContext(
    SpeakerDataContext,
  );
  if (!context) {
    throw new Error(
      "useSpeakerDataContext must be used within a SpeakerDataProvider",
    );
  }
  return context;
}
