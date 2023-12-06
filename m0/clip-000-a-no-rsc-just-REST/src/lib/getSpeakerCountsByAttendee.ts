import prisma from "@/lib/prisma/prisma";

type SpeakerCount = {
  [key: number]: number;
};

// Define a type for the result of the groupBy query
type GroupByResult = {
  speakerId: number;
  _count: {
    speakerId: number;
  };
};

export async function getSpeakerCountsByAttendee(speakerIds: number[]): Promise<SpeakerCount> {
  const counts = await prisma.attendeeFavorite.groupBy({
    by: ['speakerId'],
    _count: {
      speakerId: true,
    },
    where: {
      speakerId: {
        in: speakerIds,
      },
    },
  });

  const speakerCounts: SpeakerCount = {};
  counts.forEach((item: GroupByResult) => {
    speakerCounts[item.speakerId] = item._count.speakerId;
  });

  return speakerCounts;
}