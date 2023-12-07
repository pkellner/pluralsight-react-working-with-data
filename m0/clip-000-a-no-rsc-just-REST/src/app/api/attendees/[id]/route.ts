// Import prisma from the prisma client
import prisma from "@/lib/prisma/prisma";

// This function handles the GET request
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {

  try {
    const attendee = await prisma.attendee.findUnique({
      where: { id : params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdDate: true,
      },
    });

    if (!attendee) {
      return new Response(JSON.stringify({ message: "Attendee not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(attendee, null, 2), {
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// This function handles the PUT request
export async function PUT(request: Request) {
  await sleep(1000);
  try {
    const id = request.url.split("/").pop();
    const data = await request.json();
    const updatedAttendee = await prisma.attendee.update({
      where: { id: id },
      data,
    });

    return new Response(JSON.stringify(updatedAttendee, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating attendee" }), {
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
      // 1. Delete related records in AttendeeFavorite
      await prisma.attendeeFavorite.deleteMany({
        where: { attendeeId: id },
      });

      // 3. Finally, delete the attendee
      await prisma.attendee.delete({
        where: { id },
      });
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting attendee" }), {
      status: 500,
    });
  }
}
