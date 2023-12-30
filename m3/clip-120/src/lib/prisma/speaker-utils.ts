import prisma from "./prisma";
import { Speaker } from "@/lib/general-types";

export interface ExtendedSpeaker extends Speaker {
  favorite?: boolean;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

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
  return prisma.$transaction(async (prisma: any) => {
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
    await sleep(1000);
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
    )
      .sort(
        (a, b) =>
          a.lastName.localeCompare(b.lastName) ||
          a.firstName.localeCompare(b.firstName),
      )
      .map((speaker: Speaker) => ({
        ...speaker,
        favoriteCount: speaker?._count?.favorites,
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

      speakers.map((speaker: Speaker) => {
        return {
          ...speaker,
          favorite: attendeeFavorites?.some((value: { attendeeId: string; speakerId: number }) =>
            value.speakerId === speaker.id),
        };
      });
    } else {
      return speakers;
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
  await prisma.speaker.update({
    where: { id: Number(speaker.id) },
    data: {
      firstName: speaker.firstName,
      lastName: speaker.lastName,
      company: speaker.company,
      twitterHandle: speaker.twitterHandle,
      userBioShort: speaker.userBioShort,
      timeSpeaking:
        speaker.timeSpeaking === undefined || speaker.timeSpeaking === null
          ? new Date(0)
          : speaker.timeSpeaking,
    },
  });

  if (attendeeId) {
    if (speaker.favorite) {
      const count = await prisma.attendeeFavorite.count({
        where: {
          speakerId: Number(speaker.id),
          attendeeId: attendeeId,
        },
      });
      if (count === 0) {
        await prisma.attendeeFavorite.create({
          data: {
            speakerId: Number(speaker.id),
            attendeeId: attendeeId,
          },
        });
      }
    } else {
      await prisma.attendeeFavorite.deleteMany({
        where: {
          speakerId: Number(speaker.id),
          attendeeId: attendeeId,
        },
      });
    }
  }

  // if attendee logged in, then this gets favorite status also. otherwise, it's just the speaker data
  return await getSpeakerDataById(speaker.id, attendeeId);
}
