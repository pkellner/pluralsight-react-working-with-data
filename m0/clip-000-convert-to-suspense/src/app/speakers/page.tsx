import Header from "@/app/header";
import Footer from "@/app/footer";
import React, { Suspense } from "react";
import SpeakerPage from "@/app/speakers/speaker-page";

export default function Speakers() {
  // Header needs to be wrapped by SpeakerDataProvider as it contains login/logout which will need to update the speaker data context (for favorite speakers)
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Suspense fallback={<div>Loading......</div>}>
          <SpeakerPage />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
