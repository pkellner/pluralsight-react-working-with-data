"use client";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";

export default function Speakers() {
  return (
    <SpeakerDataProvider>
      <SpeakerList />
    </SpeakerDataProvider>
  );
}
