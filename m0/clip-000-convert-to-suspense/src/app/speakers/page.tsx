"use client";
import Header from "@/app/header";
import Footer from "@/app/footer";
import React from "react";
import SpeakerPage from "@/app/speakers/speaker-page";

export default function Speakers() {
  // Header needs to be wrapped by SpeakerDataProvider as it contains login/logout which will need to update the speaker data context (for favorite speakers)
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <SpeakerPage />
      </div>
      <Footer />
    </div>
  );
}
