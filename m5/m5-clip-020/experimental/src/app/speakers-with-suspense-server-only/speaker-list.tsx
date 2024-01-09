import React from "react";
import SpeakerDetail from "@/app/speakers-with-suspense-server-only/speaker-detail";
import { Speaker } from "@/lib/general-types";

export default async function SpeakerList() {

  async function fetchSpeakers() {
    const response = await fetch("http://localhost:3000/api/speakers");
    return await response.json();
  }

  const speakerList = await fetchSpeakers();

  return (
    <div className="container pb-4">
      <div className="row g-4">
        {speakerList.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
