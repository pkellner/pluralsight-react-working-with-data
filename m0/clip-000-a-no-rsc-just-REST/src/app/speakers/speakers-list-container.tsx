"use client";
import React from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";

export default function SpeakersListContainer() {
  return (
    <SpeakerMenuProvider>
      <SpeakerMenuProvider>
        <SpeakerMenu />
        <div className="container">
          <div className="row g-4">
            <SpeakersList />
          </div>
        </div>
      </SpeakerMenuProvider>
    </SpeakerMenuProvider>
  );
}
