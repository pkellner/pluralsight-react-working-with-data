"use client";
import React from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";
import {SpeakerModalProvider,} from "@/components/contexts/speaker-modal-context";

export default function SpeakersListContainer() {
  return (
    <SpeakerDataProvider>
      <SpeakerMenuProvider>
        <SpeakerModalProvider>
          <SpeakerMenu />

              <SpeakersList />

        </SpeakerModalProvider>
      </SpeakerMenuProvider>
    </SpeakerDataProvider>
  );
}
