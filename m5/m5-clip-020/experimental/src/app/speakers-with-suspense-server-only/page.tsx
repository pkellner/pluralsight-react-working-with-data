import SpeakerList from "@/app/speakers-with-suspense-server-only/speaker-list";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import { Suspense } from "react";

export default function Speakers() {


  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <Suspense fallback={<div>Loading......</div>}>
          <SpeakerList  />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
