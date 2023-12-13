"use client";
import React from "react";
import useSpeakerSortAndFilter from "@/components/hooks/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { useSpeakerMenuContext } from "@/components/contexts/speaker-menu-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();
  const { speakerListOptimistic } = useSpeakerDataContext();
  const speakerListFiltered = useSpeakerSortAndFilter(
    speakerListOptimistic,
    searchText,
  );

  return (
    <div className="container">
      <div className="row g-4">
        {[...speakerListFiltered].map(({ id }) => (
          <SpeakerDetail key={id} speakerId={id} />
        ))}
      </div>
    </div>
  );
}
