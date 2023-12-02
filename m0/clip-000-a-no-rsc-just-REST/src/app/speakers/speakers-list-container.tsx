"use client";
import React, {useState} from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import {Speaker} from "@/lib/general-types";

export default function SpeakersListContainer() {

  const [speakerList, setSpeakerList] = useState<Speaker[]>([]);
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

        const newSpeaker = await response.json(); // Read the response once
        setSpeakerList([...speakerList, newSpeaker]);

        // No need to call response.json() again, newSpeaker already holds the parsed response
        return newSpeaker;
      } catch (error) {
        console.error("Error creating new speaker:", error);
        throw error;
      }
    }
    create().then(() => {});
  }



  function updateSpeaker(speaker : Speaker) {
    async function update() {
      try {
        const response = await fetch(`/api/speakers/${speaker.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const updatedSpeaker = await response.json();
        setSpeakerList(speakerList.map((speaker) => speaker.id === updatedSpeaker.id ? updatedSpeaker : speaker));
        return updatedSpeaker;
      } catch (error) {
        console.error("Error updating speaker:", error);
        throw error;
      }
    }
    update().then(() => {});
  }

  return (
    <SpeakerMenuProvider>
      <SpeakerMenu createSpeaker={createSpeaker} updateSpeaker={updateSpeaker}   />
      <div className="container">
        <div className="row g-4">
          <SpeakersList speakerList={speakerList} setSpeakerList={setSpeakerList} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus}
          error={error} setError={setError} createSpeaker={createSpeaker} updateSpeaker={updateSpeaker} />
        </div>
      </div>
    </SpeakerMenuProvider>
  );
}
