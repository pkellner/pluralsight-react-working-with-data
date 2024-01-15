"use client";
import SpeakerDetail from "./speaker-detail";
import { Speaker } from "@/lib/general-types";
import SpeakerDataProvider, {
  useSpeakerDataContext,
} from "@/contexts/speaker-data-context";

export default function Speakers() {
  return (
    <SpeakerDataProvider>
      <InternalSpeakers />
    </SpeakerDataProvider>
  );
}

export function InternalSpeakers() {
  const { speakerList, loadingStatus, error } = useSpeakerDataContext();

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
