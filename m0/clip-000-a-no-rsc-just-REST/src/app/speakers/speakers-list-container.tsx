"use client";
import React, {useState} from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import {Speaker} from "@/lib/general-types";

export default function SpeakersListContainer() {

  const [speakerList, setSpeakerList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // default to loading
  const [error, setError] = useState<string | undefined>(); // error state

  function createSpeaker(speaker: Speaker) {
    async function create() {
      try {
        const response = await fetch(`/api/speakers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error creating new speaker:", error);
        throw error;
      }
    }
    create().then(() => {});
  }



  return (
    <SpeakerMenuProvider>
      <SpeakerMenu createSpeaker={createSpeaker}   />
      <div className="container">
        <div className="row g-4">
          <SpeakersList speakerList={speakerList} setSpeakerList={setSpeakerList} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus}
          error={error} setError={setError} />
        </div>
      </div>
    </SpeakerMenuProvider>
  );
}
