import prisma from "@/lib/prisma/prisma";
import { Speaker } from "@/lib/general-types";

// Define an interface that extends the Speaker type from Prisma
interface ExtendedSpeaker extends Speaker {
  favorite?: boolean;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function getSpeakers(attendeeId: string) {
  try {
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

      return speakersWithFavorites;
    }
  } catch (err) {
    throw new Error("An unexpected error occurred in getSpeakers");
  }
}

export async function getSpeakerDataById(id: number, attendeeId?: string) {
  const speakerData = await prisma.speaker.findUnique({
    where: { id },
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
  });

  if (!speakerData) {
    throw new Error("Speaker not found:" + id);
  }

  const speakerOri: Speaker = {
    ...speakerData,
    favoriteCount: speakerData._count.favorites,
  };

  let isFavorite: boolean;
  const count = await prisma.attendeeFavorite.count({
    where: {
      speakerId: id,
      attendeeId: attendeeId ?? undefined,
    },
  });
  isFavorite = count !== 0;

  let speaker: ExtendedSpeaker | null = null;

  if (speakerOri) {
    speaker = {
      ...speakerOri,
      favorite: isFavorite,
    };
  }
  return speaker;
}

export async function getUpdatedSpeakerBasedOnFields(
  speaker: Speaker,
  attendeeId: string | undefined,
) {
  const speakerId = speaker.id;
  const {
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  } = speaker;

  const originalSpeaker = await getSpeakerDataById(
    Number(speakerId),
    attendeeId,
  );

  await prisma.speaker.update({
    where: { id: Number(speakerId) },
    data: {
      firstName,
      lastName,
      company,
      twitterHandle,
      userBioShort,
      timeSpeaking:
        timeSpeaking === undefined || timeSpeaking === null
          ? new Date(0)
          : timeSpeaking,
    },
  });

  // only update favorite count if there is a logged in user, and if the favorite value has changed

  if (attendeeId) {
    if (favorite !== originalSpeaker?.favorite) {
      if (favorite) {
        await prisma.attendeeFavorite.create({
          data: {
            attendeeId: attendeeId ?? "",
            speakerId: Number(speakerId),
          },
        });
      } else {
        await prisma.attendeeFavorite.deleteMany({
          where: {
            attendeeId: attendeeId,
            speakerId: Number(speakerId),
          },
        });
      }
    }
  }

  // if attendee logged in, then this gets favorite status also. otherwise, it's just the speaker data
  return await getSpeakerDataById(Number(speakerId), attendeeId);
}
