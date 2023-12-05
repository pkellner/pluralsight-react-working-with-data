// Import prisma from the prisma client
import prisma from "@/lib/prisma/prisma";
import { Speaker } from "@/lib/general-types";
import {NextRequest} from "next/server";

function getValuesFromToken(value: string) {
  const [firstName, lastName, attendeeId] = value.split("/");
  if (!firstName || !lastName || !attendeeId) {
    throw new Error("Invalid authorization token");
  }
  return { firstName, lastName, attendeeId };
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Define an interface that extends the Speaker type from Prisma
interface ExtendedSpeaker extends Speaker {
  favorite?: boolean;
}

async function getSpeakerDataById(id: number) {
  const speakerData: Speaker | null = await prisma.speaker.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      company: true,
      twitterHandle: true,
      userBioShort: true,
      timeSpeaking: true,
      // _count: {
      //   select: {
      //     favorites: true,
      //   },
      // },
    },
  });

  if (!speakerData) {
    throw new Error("Speaker not found:" + id);
  }

  const speakerOri: Speaker = speakerData as Speaker;

  const isFavorite =
    (await prisma.attendeeFavorite.count({
      where: {
        speakerId: id,
      },
    })) > 0;

  let speaker: ExtendedSpeaker | null = null;

  if (speakerOri) {
    speaker = {
      ...speakerOri,
      // favoriteCount: 0, // speakerOri._count?.favorites ?? 0,
      favorite: isFavorite,
    };
  }
  return speaker;
}

// This function handles the GET request
export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id);
  try {
    await sleep(1000);

    let speaker = await getSpeakerDataById(id);

    if (!speaker) {
      return new Response(JSON.stringify({ message: "Speaker not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(speaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// This function handles the PUT request (UPDATE)
export async function PUT(request: NextRequest) {
  try {
    await sleep(1000);
    const id = request.url.split("/").pop();
    const requestData = await request.json();
    // Extract only the specific fields to update
    const {
      firstName,
      lastName,
      company,
      twitterHandle,
      userBioShort,
      timeSpeaking,
      favorite,
    } = requestData;

    const originalSpeaker = await getSpeakerDataById(Number(id));

    await prisma.speaker.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        company,
        twitterHandle,
        userBioShort,
        timeSpeaking,
      },
    });

    if (favorite !== originalSpeaker?.favorite) {
      console.log("/speakers/[id]/route.ts: PUT: favorite changed. new,original:",favorite, originalSpeaker?.favorite);

      const authorization = request.cookies.get("authToken");
      if (
        !(authorization && authorization.value && authorization.value.length > 0)
      ) {
        throw new Error("No authorization token found");
      }
      const { attendeeId } = getValuesFromToken(
        authorization.value,
      );
      if (favorite) {
        await prisma.attendeeFavorite.create({
          data: {
            attendeeId: attendeeId ?? "",
            speakerId: Number(id),
          },
        });
      } else {
        await prisma.attendeeFavorite.deleteMany({
          where: {
            attendeeId: attendeeId ?? "",
            speakerId: Number(id),
          },
        });
      }
    }

    let updatedSpeaker = await getSpeakerDataById(Number(id));

    return new Response(JSON.stringify(updatedSpeaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating speaker" }), {
      status: 500,
    });
  }
}

// This function handles the DELETE request
export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id);
  try {
    await sleep(1000);
    const id = request.url.split("/").pop();

    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // 1. Delete related records in SpeakerSession
      await prisma.speakerSession.deleteMany({
        where: { speakerId: Number(id) },
      });

      // 2. Delete related records in AttendeeFavorite
      await prisma.attendeeFavorite.deleteMany({
        where: { speakerId: Number(id) },
      });

      // 3. Finally, delete the speaker
      await prisma.speaker.delete({
        where: { id: Number(id) },
      });
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting speaker" }), {
      status: 500,
    });
  }
}
