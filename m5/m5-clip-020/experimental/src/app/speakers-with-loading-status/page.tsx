"use client";
import SpeakerList from "@/app/speakers-with-loading-status/speaker-list";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />

        <SpeakerList />
      </div>
      <Footer />
    </div>
  );
}
