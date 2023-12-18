"use client";
import React from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";

export default function SpeakersListContainer() {
  return (
    <SpeakerDataProvider>
      <SpeakerMenuProvider>
        <SpeakerMenu />
        <SpeakersList />
      </SpeakerMenuProvider>
    </SpeakerDataProvider>
  );
}