// Import prisma from the prisma client
import prisma from "@/lib/prisma/prisma";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// This function handles the GET request
export async function GET(request: Request) {
  try {
    await sleep(1000);
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const speaker = await prisma.speaker.findUnique({
      where: { id: parseInt(id ?? "0") },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        company: true,
        twitterHandle: true,
        userBioShort: true,
      },
    });

    if (!speaker) {
      return new Response(JSON.stringify({ message: "Speaker not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(speaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// This function handles the PUT request
export async function PUT(request: Request) {

  try {
    await sleep(100);
    const id = request.url.split('/').pop();
    //console.log("route.ts PUT request id:", id);
    const data = await request.json();
    //console.log("route.ts PUT request data:", data)

    const updatedSpeaker = await prisma.speaker.update({
      where: { id: parseInt(id ?? "0") },
      data,
    });

    return new Response(JSON.stringify(updatedSpeaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating speaker" }), { status: 500 });
  }
}


// This function handles the DELETE request
export async function DELETE(request: Request) {
  try {
    await sleep(100);
    const id = request.url.split('/').pop();

    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // 1. Delete related records in SpeakerSession
      await prisma.speakerSession.deleteMany({
        where: { speakerId: parseInt(id ?? "0") },
      });

      // 2. Delete related records in AttendeeFavorite
      await prisma.attendeeFavorite.deleteMany({
        where: { speakerId: parseInt(id ?? "0")  },
      });

      // 3. Finally, delete the speaker
      await prisma.speaker.delete({
        where: { id: parseInt(id ?? "0")  },
      });
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting speaker" }), { status: 500 });
  }
}
