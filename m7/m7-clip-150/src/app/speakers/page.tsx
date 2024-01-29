import Footer from "@/app/footer";
import Nav from "@/app/nav";
import Header from "@/app/header";
import NextAuthProvider from "@/contexts/next-auth-provider";
import SpeakerMenuProvider from "@/contexts/speaker-menu-context";
import { SpeakerModalProvider } from "@/contexts/speaker-modal-context";
import SpeakerListContainer from "@/app/speakers/speaker-list-container";
import { Suspense } from "react";
import SpeakerListPending from "@/app/speakers/speaker-list-pending";

export default function Speakers() {
  return (
    <div className="container">
      <Header />
      <div className="full-page-border app-content-background">
        <NextAuthProvider>
          <SpeakerMenuProvider>
            <SpeakerModalProvider>
              <Nav />
              <Suspense
                fallback={
                  <SpeakerListPending />
                }
              >
                <SpeakerListContainer />
              </Suspense>
            </SpeakerModalProvider>
          </SpeakerMenuProvider>
        </NextAuthProvider>
      </div>
      <Footer />
    </div>
  );
}
