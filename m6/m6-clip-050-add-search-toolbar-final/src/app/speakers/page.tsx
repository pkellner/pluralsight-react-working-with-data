"use client";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import NextAuthProvider from "@/contexts/next-auth-provider";
import SpeakerMenuProvider from "@/contexts/speaker-menu-context";
import SpeakerMenu from "@/app/speakers/speaker-menu";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <NextAuthProvider>
          <Nav />
          <SpeakerDataProvider>
            <SpeakerMenuProvider>
              <SpeakerMenu />
              <SpeakerList />
            </SpeakerMenuProvider>
          </SpeakerDataProvider>
        </NextAuthProvider>
      </div>
      <Footer />
    </div>
  );
}
