"use client";
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
type LoadingStatusType = "loading" | "success" | "error";

export default function Speakers() {
  const initialState = {
    speakerList: [] as Speaker[],
    loadingStatus: "loading" as LoadingStatusType,
    error: undefined as string | undefined,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        setState((prevState) => ({ ...prevState, loadingStatus: "loading" }));
        const response = await fetch("/api/speakers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000);
        setState((prevState) => ({
          ...prevState,
          speakerList: data,
          loadingStatus: "success",
        }));
      } catch (err) {
        if (err instanceof Error) {
          const errorMessage = err.message || "An unexpected error occurred";
          setState((prevState) => ({
            ...prevState,
            error: errorMessage,
            loadingStatus: "error",
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: "An unexpected error occurred",
            loadingStatus: "error",
          }));
        }
      }
    }
    fetchSpeakers().then(() => {});
  }, []);

  if (state.loadingStatus === "error") {
    return <div className="card">Error: {state.error}</div>;
  }

  if (state.loadingStatus === "loading") {
    return (
      <div className="container">
        <div className="row g-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <SpeakerDetailPending key={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row g-4">
        {state.speakerList.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
