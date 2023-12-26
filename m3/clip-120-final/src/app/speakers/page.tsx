"use client";
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";

type LoadingStatusType = "loading" | "success" | "error";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


export default function Speakers() {

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
        await sleep(500);

        setSpeakerList(
          data.map((speaker: Speaker) => {
            return speaker;
          }),
        );
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
