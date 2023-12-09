import Nav from "@/app/nav";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";
import React from "react";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";

export default function SpeakerPage() {
  return (
    <SpeakerDataProvider>
      <Nav />
      <SpeakersListContainer />
    </SpeakerDataProvider>
  );
}
