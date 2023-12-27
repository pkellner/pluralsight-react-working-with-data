"use client";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";
import { SpeakerModalProvider } from "@/contexts/speaker-modal-context";
import SpeakerMenuProvider from "@/contexts/speaker-menu-context";
import SpeakerMenu from "@/app/speakers/speaker-menu";

export default function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <SpeakerDataProvider>
          <SpeakerMenuProvider>
            <SpeakerModalProvider>
              <SpeakerModal />
              <SpeakerMenu />
              <SpeakerList />
            </SpeakerModalProvider>
          </SpeakerMenuProvider>
        </SpeakerDataProvider>
      </div>
      <Footer />
    </div>
  );
}
