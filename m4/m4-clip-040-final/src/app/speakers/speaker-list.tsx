import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { Speaker } from "@/lib/general-types";

export default function SpeakerList() {
  const { speakerState } = useSpeakerDataContext();

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
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

  return (
    <div className="container">
      <div className="row g-4">
        {speakerState.speakerList.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
