import React, { use } from "react";
import SpeakerDetail from "@/app/speakers-with-suspense/speaker-detail";
import { Speaker } from "@/lib/general-types";

export default function SpeakerList({
  speakerListPromise,
}: {
  speakerListPromise: Promise<Speaker[]>;
}) {
  const speakerList: Speaker[] = use(speakerListPromise);
  console.log("speakerList", speakerList[0])
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
