import { NextRequest } from "next/server";
import { createSpeakerRecord, getSpeakers } from "@/lib/prisma/speaker-utils";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export async function GET(request: NextRequest) {
  await sleep(2000);

  const speakers = await getSpeakers("");

  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// This function handles the POST request (INSERT)
export async function POST(request: Request) {
  await sleep(2000);
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
