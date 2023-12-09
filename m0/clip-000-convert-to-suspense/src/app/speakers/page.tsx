import Header from "@/app/header";
import Nav from "@/app/nav";
import Footer from "@/app/footer";
import React from "react";
import SpeakersListContainer from "@/app/speakers/speakers-list-container";
import SpeakerDataProvider from "@/components/contexts/speaker-data-context";
import { Speaker } from "@/lib/general-types";
import prisma from "@/lib/prisma/prisma";
import {useLocalAuthContext} from "@/components/contexts/auth-context";
import {cookies} from "next/headers";


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getSpeakers(attendeeId: string) {
  try {
    // DANGER: This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.
    // const authorization = request.cookies.get("authToken");
    // if (authorization && authorization.value && authorization.value.length > 0) {
    //   attendeeId = getValuesFromToken(authorization.value).attendeeId;
    // }

    console.log("speaker-data.tsx: attendeeId: ", attendeeId);

    await sleep(2000);
    const speakers = (
      await prisma.speaker.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          company: true,
          twitterHandle: true,
          userBioShort: true,
          timeSpeaking: true,
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      })
    ).map((speaker) => ({
      ...speaker,
      favoriteCount: speaker._count.favorites,
    }));

    //return speakers;

    if (attendeeId) {
      const attendeeFavorites = await prisma.attendeeFavorite.findMany({
        where: {
          attendeeId: attendeeId ?? "",
        },
        select: {
          attendeeId: true,
          speakerId: true,
        },
      });

      const speakersWithFavorites = speakers.map((speaker) => {
        return {
          ...speaker,
          favorite: attendeeFavorites?.some(
            (attendeeFavorite) => attendeeFavorite.speakerId === speaker.id,
          ),
        };
      });

      console.log("speaker-data.tsx: speakers: ", speakers);
      return speakersWithFavorites;
    }
  } catch (err) {
    throw new Error("An unexpected error occurred in getSpeakers");
  }
}

export default async function Speakers() {


  const nextCookies = cookies(); // Get cookies object
  console.log("layout.tsx: nextCookies: ", nextCookies);
  const token = nextCookies.get('authToken') // Find cookie
  console.log("layout.tsx: token: ", token?.value);
  // token.value is like this: Clara/Bashirian/6e76653c-c4fd-4eef-9feb-d403bfbcfe5f so get 3rd token.
  const attendeeId = token?.value.split("/")[2];
  console.log("layout.tsx: attendeeId: ", attendeeId);

  const speakerList : Speaker[] | undefined = await getSpeakers(attendeeId ?? "");
  await sleep(1000);



  return (
    <div className="container-fluid">
      <SpeakerDataProvider speakerListInit={speakerList ?? []}>
        <Header speakerListUpdate={true} />
        <div className="full-page-border app-content-background">
          <Nav />
          <SpeakersListContainer />
        </div>
        <Footer />
      </SpeakerDataProvider>
    </div>
  );
}
