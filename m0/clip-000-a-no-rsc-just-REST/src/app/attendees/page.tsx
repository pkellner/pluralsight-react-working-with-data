"use client";
import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";
import AttendeesListContainer from "@/app/attendees/attendees-list-container";

export default function Speakers() {
  return (
    <div className="container-fluid">
      <Header />

      <div className="full-page-border app-content-background">
        <Nav />
        <AttendeesListContainer />
      </div>
      <Footer />
    </div>
  );
}
