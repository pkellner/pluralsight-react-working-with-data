"use client";
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

export default function Speakers() {
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

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerState.speakerList.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
