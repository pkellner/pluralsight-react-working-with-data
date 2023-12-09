import React from "react";
import SpeakerMenuProvider from "@/components/contexts/speaker-menu-context";
import SpeakersList from "@/app/speakers/speakers-list";
import SpeakerMenu from "@/app/speakers/speaker-menu";
import { SpeakerModalProvider } from "@/components/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";
import { Speaker } from "@/lib/general-types";
import { cookies } from "next/headers";
import { getSpeakers } from "@/lib/prisma/speaker-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SpeakersListContainer() {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("authToken"); // Find cookie
  const attendeeId = token?.value.split("/")[2];

  const speakerList: Speaker[] | undefined = await getSpeakers(
    attendeeId ?? "",
  );
  await sleep(1000);

  return (
    <SpeakerDataProvider speakerListInit={speakerList ?? []}>
      <SpeakerMenuProvider>
        <SpeakerModalProvider>
          <SpeakerModal />
          <SpeakerMenu />

          <SpeakersList />
        </SpeakerModalProvider>
      </SpeakerMenuProvider>
    </SpeakerDataProvider>
  );
}
