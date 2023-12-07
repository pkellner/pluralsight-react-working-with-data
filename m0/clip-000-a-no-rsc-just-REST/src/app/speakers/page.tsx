"use client";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";

export default function Speakers() {
  // Header needs to be wrapped by SpeakerDataProvider as it contains login/logout which will need to update the speaker data context (for favorite speakers)
  return (
    <div className="container-fluid">
      <SpeakerDataProvider>
        <Header speakerListUpdate={true} />
        <div className="full-page-border app-content-background">
          <Nav />
          <SpeakersListContainer />
        </div>
        <Footer />
      </SpeakerDataProvider>
    </div>
  );
}
