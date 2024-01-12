import SpeakerDetail from "@/app/speakers/speaker-detail";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";

export default function SpeakerList() {
  const { speakerState } = useSpeakerDataContext();

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
    return <div>Loading ...</div>;
  }

  const speakerListSorted = speakerState.speakerList.sort(
    (a: Speaker, b: Speaker) => {
      const nameA = a.lastName + a.firstName;
      const nameB = b.lastName + b.firstName;
      return nameA.localeCompare(nameB);
    },
  );

  return (
    <div className="container pb-4">
      <div className="row g-4">
        {speakerListSorted.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
