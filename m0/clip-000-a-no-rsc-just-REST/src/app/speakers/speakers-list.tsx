'use client'
import React, { useState, useEffect } from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const [speakerList, setSpeakerList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // default to loading
  const [error, setError] = useState<string | undefined>(); // error state

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const response = await fetch('/api/speakers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        await sleep(1000);
        setSpeakerList(data);
        setLoadingStatus('success');
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch SpeakersList", err);
          setError(err.message);
        } else {
          console.error('An unexpected error occurred');
          setError('An unexpected error occurred');
        }
        setLoadingStatus('error');
      }
    }
    fetchSpeakers().then(() => {});
  }, []);

  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  if (loadingStatus === "loading") {
    return <div className="card">Loading...</div>;
  }

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  return (
    <>
      {speakerListFiltered.map(function (speakerRec) {
        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerRec={speakerRec}
          />
        );
      })}
      <div className="mt-3"></div>
    </>
  );
}
