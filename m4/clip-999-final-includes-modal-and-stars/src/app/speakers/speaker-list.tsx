import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { Speaker } from "@/lib/general-types";
import useSpeakerSortAndFilter from "@/hooks/use-speaker-sort-and-filter";
import {useSpeakerMenuContext} from "@/contexts/speaker-menu-context";

export default function SpeakerList() {
  const { speakerState } = useSpeakerDataContext();
  const { searchText } = useSpeakerMenuContext();

  if (speakerState.loadingStatus === "error") {
    return <div className="card">Error: {speakerState.error}</div>;
  }

  if (speakerState.loadingStatus === "loading") {
    return (
      <div className="container pb-4">
        <div className="row g-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <SpeakerDetailPending key={item} />
          ))}
        </div>
      </div>
    );
  }

  const speakerListFiltered = useSpeakerSortAndFilter(speakerState.speakerList, searchText);

  return (
    <div className="container pb-4">
      <div className="row g-4">
        {speakerListFiltered.map(function (speaker: Speaker) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
