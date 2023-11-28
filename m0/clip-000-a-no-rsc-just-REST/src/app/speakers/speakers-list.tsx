'use client'
import React, { useContext, useMemo } from "react";
import useSpeakerSortAndFilter from "@/app/speakers/use-speaker-sort-and-filter";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import {useSpeakerMenuContext} from "@/components/contexts/speaker-menu-context";

export default function SpeakersList() {
  const { searchText } = useSpeakerMenuContext();

  const { speakerList, loadingStatus } = {
    speakerList: [],
    loadingStatus: "success",
  };

  const speakerListFiltered = useSpeakerSortAndFilter(speakerList, searchText);

  if (loadingStatus === "loading") {
    return <div className="card">Loading...</div>;
  }
  return (
    <>
      {speakerListFiltered.map(function (speakerRec) {
        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerRec={speakerRec}
          />
        );
      })}
    </>
  );
}
