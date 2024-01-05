"use client";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";

export default function Speakers() {
  // return (
  //   <SpeakerDataProvider>
  //     <SpeakerList />
  //   </SpeakerDataProvider>
  // );

  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <SpeakerDataProvider>
          <SpeakerList />
        </SpeakerDataProvider>
      </div>
      <Footer />
    </div>
  );
}
