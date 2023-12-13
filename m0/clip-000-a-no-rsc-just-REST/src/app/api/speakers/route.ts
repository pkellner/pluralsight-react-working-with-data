import { NextRequest } from "next/server";
import { createSpeakerRecord, getSpeakers } from "@/lib/speaker-utils";

// Splits a token into first name, last name, and attendee ID, throwing an error if the format is invalid.
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
export async function GET(request: NextRequest) {
  await sleep(1000);

  // DANGER: This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.
  let attendeeId;
  const authorization = request.cookies.get("authToken");
  if (authorization && authorization.value && authorization.value.length > 0) {
    attendeeId = getValuesFromToken(authorization.value).attendeeId;
  }

  const speakers = await getSpeakers(attendeeId ?? "");

  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// This function handles the POST request (INSERT)
export async function POST(request: Request) {
  await sleep(1000);
  try {
    const data = await request.json();
    delete data.id; // let the database handle assigning the id
    delete data.favorite; // this will confuse prisma and it's virtual field

    const newSpeaker = await createSpeakerRecord(data);

    return new Response(JSON.stringify(newSpeaker, null, 2), {
      status: 201,
      headers: {
        // CORS headers
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating speaker" }), {
      status: 500,
    });
  }
}
