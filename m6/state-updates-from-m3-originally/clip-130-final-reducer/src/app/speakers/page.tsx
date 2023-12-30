"use client";
import { useEffect, useReducer } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
type LoadingStatusType = "loading" | "success" | "error";

const initialState = {
  speakerList: [] as Speaker[],
  loadingStatus: "loading" as LoadingStatusType,
  error: undefined as string | undefined,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loadingStatus: "loading" };
    case "SUCCESS":
      return {
        ...state,
        speakerList: action.payload,
        loadingStatus: "success",
      };
    case "ERROR":
      return { ...state, error: action.payload, loadingStatus: "error" };
    default:
      return state;
  }
}

export default function Speakers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchSpeakers() {
      dispatch({ type: "LOADING" });
      try {
        const response = await fetch("/api/speakers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000);
        dispatch({ type: "SUCCESS", payload: data });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        dispatch({ type: "ERROR", payload: errorMessage });
      }
    }
    fetchSpeakers();
  }, []);

  if (state.loadingStatus === "error") {
    return <div className="card">Error: {state.error}</div>;
  }

  if (state.loadingStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {state.speakerList.map((speaker: Speaker) => (
          <SpeakerDetail key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </div>
  );
}
