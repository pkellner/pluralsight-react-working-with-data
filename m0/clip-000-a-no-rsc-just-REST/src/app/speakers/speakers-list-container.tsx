"use client";
import React from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import { SpeakerModalProvider } from "@/components/contexts/speaker-modal-context";

export default function SpeakersListContainer() {
  return (
    <SpeakerMenuProvider>
      <SpeakerModalProvider>
        <SpeakerMenu />
        <SpeakersList />
      </SpeakerModalProvider>
    </SpeakerMenuProvider>
  );
}
