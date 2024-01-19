"use client";
import { Suspense } from "react";
import SpeakerList from "@/app/speakers-with-suspense/speaker-list";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import ErrorBoundary from "@/app/error-boundary";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Speakers() {
  async function fetchSpeakers() {
    await sleep(2000);
    const response = await fetch("http://localhost:3000/api/speakers");
    return await response.json();
  }

  const speakerListPromise = fetchSpeakers();

  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <Nav />
        <ErrorBoundary fallback={<div>Error Retrieving Speakers Data</div>}>
          <Suspense fallback={<div>Loading......</div>}>
            <SpeakerList speakerListPromise={speakerListPromise} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
}
