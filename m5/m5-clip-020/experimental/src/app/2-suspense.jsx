import React, { use } from "react";
import SpeakerDetail from "@/app/speakers-with-suspense/speaker-detail";
import { Speaker } from "@/lib/general-types";




export default function Speakers() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading......</div>}>
        <SpeakerList speakerListPromise={speakerListPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

async function fetchSpeakers() {
  await sleep(2000);
  const response = await fetch("http://localhost:3000/api/speakers");
  return await response.json();
}

function SpeakerList({ speakerListPromise }) {
  const speakerList = use(speakerListPromise);
  return (
    <ul>
      {speakerState.speakerList.map(speaker => (
        <li key={speaker.id}>
          {speaker.firstName} {speaker.lastName}
        </li>
      ))}
    </ul>
  );
}

