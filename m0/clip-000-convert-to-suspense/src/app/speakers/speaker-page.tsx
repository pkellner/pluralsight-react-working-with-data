import Nav from "@/app/nav";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";
import React from "react";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";
import {cookies} from "next/headers";
import {Speaker} from "@/lib/general-types";
import {getSpeakers} from "@/lib/speaker-utils";



export default async function SpeakerPage() {

  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("authToken"); // Find cookie
  const attendeeId = token?.value.split("/")[2];

  const speakerList: Speaker[] | undefined = await getSpeakers(
    attendeeId ?? "",
  );

  return (
    <SpeakerDataProvider speakerListInit={speakerList ?? []}>
      <Nav />
      <SpeakersListContainer />
    </SpeakerDataProvider>
  );
}
