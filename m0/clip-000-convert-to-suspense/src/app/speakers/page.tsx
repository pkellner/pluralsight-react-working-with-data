import Header from "@/app/header";
import Footer from "@/app/footer";
import React, { Suspense } from "react";
import Nav from "@/app/nav";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";

export default function Speakers() {
  // Header needs to be wrapped by SpeakerDataProvider as it contains login/logout which will need to update the speaker data context (for favorite speakers)
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Suspense fallback={<div>Loading......</div>}>
          <Nav />
          <SpeakersListContainer />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
