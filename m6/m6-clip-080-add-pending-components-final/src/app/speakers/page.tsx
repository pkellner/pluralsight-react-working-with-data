"use client";
import SpeakerList from "@/app/speakers/speaker-list";
import SpeakerDataProvider from "@/contexts/speaker-data-context";
import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import NextAuthProvider from "@/contexts/next-auth-provider";
import SpeakerMenuProvider from "@/contexts/speaker-menu-context";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import { SpeakerModalProvider } from "@/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <NextAuthProvider>
          <SpeakerMenuProvider>
            <SpeakerModalProvider>
              <Nav />
              <SpeakerDataProvider>
                <SpeakerModal />
                <SpeakerMenu />
                <SpeakerList />
              </SpeakerDataProvider>
            </SpeakerModalProvider>
          </SpeakerMenuProvider>
        </NextAuthProvider>
      </div>
      <Footer />
    </div>
  );
}
