import React from "react";
import useSpeakerSortAndFilter from "@/components/hooks/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const { speakerList, loadingStatus, error } = useSpeakerDataContext();
  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

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
        {speakerListFiltered.map(({ id }) => (
          <SpeakerDetail key={id} speakerId={id} />
        ))}
      </div>
    </div>
  );
}
