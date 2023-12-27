// Import prisma from the prisma client

import { NextRequest } from "next/server";
import {
  deleteSpeakerRecord,
  getSpeakerDataById,
  updateSpeakerRecord,
} from "@/lib/prisma/speaker-utils";
import { Speaker } from "@/lib/general-types";

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

// This function handles the GET request
export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id);
  try {
    await sleep(500);

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
  // check for logged in attendee
  const authorization = request.cookies.get("authToken");

  let attendeeId =
    authorization && authorization.value && authorization.value.length > 0
      ? getValuesFromToken(authorization.value).attendeeId
      : undefined; // or any other default value for the case when the user is not logged in

  // if no attendeeId, use a default value which is first entry in db.json file
  // this code needs to be removed (next 3 lines) when adding the mock auth to app
  if (!attendeeId) {
    attendeeId = "d06bc605-a1ef-47c0-9956-d2dc7f98f8c7";
  }

  const requestData = await request.json();
  const {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  } = requestData;

  const speaker: Speaker = {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  };

  await sleep(1000);

  try {
    let updatedSpeaker = await updateSpeakerRecord(speaker, attendeeId);

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
  await sleep(1000);
  const id = Number(request.url.split("/").pop());

  try {
    await deleteSpeakerRecord(id);

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting speaker" }), {
      status: 500,
    });
  }
}
