"use client";
import React from "react";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";

export default function SpeakersListContainer() {
  return (
    <SpeakerDataProvider>
      <SpeakersList />
    </SpeakerDataProvider>
  );
}
