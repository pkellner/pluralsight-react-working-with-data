import prisma from "@/lib/prisma/prisma";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
export async function GET(request: Request) {
  await sleep(1000);

  // get all speakers from the sqlite database with prisma
  const speakers = await prisma.speaker.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      company: true,
      twitterHandle: true,
      userBioShort: true,
      timeSpeaking: true,
    },
  });

  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // return new Response(null, { status: 404 });
}

// This function handles the POST request
export async function POST(request: Request) {
  await sleep(1000);
  try {
    const data = await request.json();
    //console.log("POST data", data);
    const newSpeaker = await prisma.speaker.create({
      data,
    });

    return new Response(JSON.stringify(newSpeaker, null, 2), {
      status: 201,
      headers: {
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
