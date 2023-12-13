// /app/attendee/[id]/route.ts
import { PrismaClient } from "@prisma/client";
import { type NextRequest } from "next/server";


const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params: { id: attendeeId } }: { params: { id: string } }
) {
  if (!attendeeId) {
    return new Response(
      JSON.stringify({ message: "Attendee ID is required" },null, 2),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const attendee = await prisma.attendee.findUnique({
      where: { id: attendeeId },
    });
    if (!attendee) {
      return new Response(null, { status: 404 });
    }
    const randomNumberBetween1000And5000 = Math.floor(Math.random() * 4000) + 1000;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(randomNumberBetween1000And5000);
    return new Response(JSON.stringify(attendee, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching attendee" },null,2),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params: { id: attendeeId } }: { params: { id: string } }
) {
  const data = await request.json();

  if (attendeeId) {
    if (data && data?.id && attendeeId !== data?.id) {
      return new Response(JSON.stringify({ message: "Attendee ID mismatch" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  if (!attendeeId && data && data?.id) {
    attendeeId = data.id;
  }

  const { email, firstName, lastName } = data;

  try {
    const updatedAttendee = await prisma.attendee.update({
      where: { id: attendeeId },
      data: { email, firstName, lastName },
    });
    return new Response(JSON.stringify(updatedAttendee), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating attendee" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { id: attendeeId } }: { params: { id: string } }
) {
  try {
    if (!attendeeId) {
      return new Response(
        JSON.stringify({ message: "Attendee ID is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const deleteAttendee = await prisma.attendee.delete({
      where: { id: attendeeId },
    });
    return new Response(JSON.stringify(deleteAttendee), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting attendee" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
