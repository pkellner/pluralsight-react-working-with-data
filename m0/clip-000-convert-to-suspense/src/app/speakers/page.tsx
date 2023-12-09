import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React, { Suspense } from "react";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ContainerRow({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">
        <div className="row g-4">{children}</div>
        &nbsp;
      </div>
    </>
  );
}

function SpeakerPendingList() {
  return (
    <ContainerRow>
      {[1, 2, 3, 4, 5].map((item) => (
        <SpeakerDetailPending key={item} />
      ))}
    </ContainerRow>
  );
}

export default async function Speakers() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />

        <Suspense fallback={<SpeakerPendingList />}>
          <SpeakersListContainer />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
