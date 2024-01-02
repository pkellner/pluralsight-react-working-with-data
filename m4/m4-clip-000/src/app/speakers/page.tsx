"use client";
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

export default function Speakers() {
  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
  type LoadingStatusType = "loading" | "success" | "error";
  const [loadingStatus, setLoadingStatus] =
    useState<LoadingStatusType>("loading");
  const [error, setError] = useState<string | undefined>(undefined);
  useEffect(() => {
    async function go() {
      try {
        const response = await fetch("/api/speakers");
        const data = await response.json();
        setSpeakerList(data);
        setLoadingStatus("success");
      } catch (error) {
        setLoadingStatus("error");
        if (error instanceof Error) {
          const errorMessage = error.message || "an unexpected error happened";
          setError(errorMessage);
        } else {
          setError("an unexpected error happened");
        }
      }
    }
    go();
  }, []);

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  if (loadingStatus === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerList.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
