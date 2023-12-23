import React from "react";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";
import { Speaker } from "@/lib/general-types";

export default function SpeakersList() {
  const { speakerList, loadingStatus, error } = useSpeakerDataContext();

  if (loadingStatus === "loading") {
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

  if (loadingStatus === "error") {
    return <div className="card">Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerList.map((speaker: Speaker) => (
          <SpeakerDetail key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </div>
  );
}
