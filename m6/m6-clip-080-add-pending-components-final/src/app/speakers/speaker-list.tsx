import SpeakerDetail from "@/app/speakers/speaker-detail";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import { useSpeakerMenuContext } from "@/contexts/speaker-menu-context";
import useSpeakerSortAndFilter from "@/hooks/use-speaker-sort-and-filter";
import SpeakerListPending from "@/app/speakers/speaker-list-pending";

export default function SpeakerList() {
  const { speakerState } = useSpeakerDataContext();
  const { searchText } = useSpeakerMenuContext();

  const speakerListSorted = useSpeakerSortAndFilter(
    speakerState.speakerList,
    searchText,
  );

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
    return <SpeakerListPending />;
  }

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
