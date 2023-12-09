import prisma from "@/lib/prisma/prisma";
import { Speaker } from "@/lib/general-types";

// Define an interface that extends the Speaker type from Prisma
export interface ExtendedSpeaker extends Speaker {
  favorite?: boolean;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function getSpeakerRecords(attendeeId: string) {
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

    return speakers.map((speaker) => {
      return {
        ...speaker,
        favorite: attendeeFavorites?.some(
          (attendeeFavorite) => attendeeFavorite.speakerId === speaker.id,
        ),
      };
    });
  } else {
    return speakers;
  }
}

export async function createSpeakerRecord(speaker: Speaker) {
  const {
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
  } = speaker;

  return prisma.speaker.create({
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
}

export async function deleteSpeakerRecord(id: number) {
  return await prisma.$transaction(async (prisma) => {
    await prisma.speakerSession.deleteMany({
      where: { speakerId: Number(id) },
    });

    await prisma.attendeeFavorite.deleteMany({
      where: { speakerId: Number(id) },
    });

    return prisma.speaker.delete({
      where: { id },
    });
  });
}

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

      return speakers.map((speaker) => {
        return {
          ...speaker,
          favorite: attendeeFavorites?.some(
            (attendeeFavorite) => attendeeFavorite.speakerId === speaker.id,
          ),
        };
      });
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

export async function updateSpeakerRecord(
  speaker: Speaker,
  attendeeId?: string | undefined,
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

  // update the speaker record
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

  if (attendeeId) {
    // if attendeeId (meaning logged in), then update attendeeFavorite table
    console.log(
      "attendees/[id]/speakers/[id]/route.ts: updateSpeakerRecord: attendeeId found so updating originalSpeaker:",
      originalSpeaker,
      "passed in new speaker:",
      speaker,
    );
    if (favorite !== originalSpeaker?.favorite ) {

      console.log("attendees/[id]/speakers/[id]/route.ts: updateSpeakerRecord: favorite changed so updating attendeeFavorite table", favorite, originalSpeaker?.favorite);

        if (attendeeId.length === 0) {
          throw new Error("attendeeId is undefined, null, or empty string and this should never happen when toggle is changing!!!");
        }


        if (favorite) {
          console.log("attendees/[id]/speakers/[id]/route.ts:doing upsert")


        } else {
          console.log("attendees/[id]/speakers/[id]/route.ts:doing delete")
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
