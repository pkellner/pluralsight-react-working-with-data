"use client";
import React from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const { speakerList } = useSpeakerDataContext();
  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  return (
    <div className="container">
      <div className="row g-4">
      {speakerListFiltered.map(({id}) => (
        <SpeakerDetail key={id} speakerId={id}/>
      ))}
    </div>
    </div>
  );
}
