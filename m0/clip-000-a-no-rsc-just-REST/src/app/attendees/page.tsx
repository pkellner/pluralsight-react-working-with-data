"use client";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";
import AttendeesListContainer from "@/app/attendees/attendees-list-container";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";

export default function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <SpeakerDataProvider>
          <Nav />
          <AttendeesListContainer />
        </SpeakerDataProvider>
      </div>
      <Footer />
    </div>
  );
}
