// Import prisma from the prisma client
import prisma from "@/lib/prisma/prisma";

// This function handles the GET request
export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  const id = Number(params.id);
  try {
    const speaker = await prisma.speaker.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        company: true,
        twitterHandle: true,
        userBioShort: true,
        // Use an aggregate query on the favorites relation
        _count: {
          select: {
            favorites: true, // Counts the number of entries in the favorites relation
          },
        },
      },
    });

    if (!speaker) {
      return new Response(JSON.stringify({ message: "Speaker not found" }), {
        status: 404,
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
    });
  }
}

// This function handles the PUT request
export async function PUT(request: Request) {
  try {
    const id = request.url.split("/").pop();
    const data = await request.json();
    const updatedSpeaker = await prisma.speaker.update({
      where: { id: parseInt(id ?? "0") },
      data,
    });

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
  { params }: { params: { id: string } },
) {
  const id =params.id;
  try {
    // Start a transaction
    await prisma.$transaction(async (prisma) => {
      // 1. Delete related records in SpeakerSession

      await prisma.attendeeFavorite.deleteMany({
        where: { attendeeId: id },
      });

      // 3. Finally, delete the speaker
      await prisma.attendee.delete({
        where: { id },
      });
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting speaker" }), {
      status: 500,
    });
  }
}
