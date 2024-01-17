"use client";
import Header from "@/app/header";
import Footer from "@/app/footer";
import React from "react";
import Nav from "@/app/nav";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";

export default function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background p-3">
        <Nav />
        <SpeakersListContainer />
      </div>
      <Footer />
    </div>
  );
}
