'use client'
import React from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

function ContainerRow({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">
        <div className="row g-4">{children}</div>
        &nbsp;
      </div>
    </>
  );
}

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const { speakerList } = useSpeakerDataContext();
  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  return (
    <ContainerRow>
      {speakerListFiltered.map(({ id }) => (
        <SpeakerDetail key={id} speakerId={id} />
      ))}
    </ContainerRow>
  );
}
