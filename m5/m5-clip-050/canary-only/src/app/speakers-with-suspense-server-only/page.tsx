import { Suspense } from "react";
import SpeakerList from "@/app/speakers-with-suspense-server-only/speaker-list";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import ErrorBoundary from "@/app/error-boundary";

export const dynamic = "force-dynamic";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <ErrorBoundary fallback={<div>Error Retrieving Speakers Data</div>}>
          <Suspense fallback={<div>Loading......</div>}>
            <SpeakerList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}
