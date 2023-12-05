import prisma from "@/lib/prisma/prisma";
import { NextRequest } from "next/server";

// Splits a token into first name, last name, and attendee ID, throwing an error if the format is invalid.
function getValuesFromToken(value: string) {
  const [firstName, lastName, attendeeId] = value.split("/");
  if (!firstName || !lastName || !attendeeId) {
    throw new Error("Invalid authorization token");
  }
  return { firstName, lastName, attendeeId };
}

export async function GET(request: NextRequest) {

  const attendees = await prisma.attendee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdDate: true,
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });



  return new Response(JSON.stringify(attendees, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("POST data", data);
    const newAttendee = await prisma.attendee.create({
      data,
    });

    return new Response(JSON.stringify(newAttendee, null, 2), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error creating attendee" }),
      { status: 500 },
    );
  }
}
