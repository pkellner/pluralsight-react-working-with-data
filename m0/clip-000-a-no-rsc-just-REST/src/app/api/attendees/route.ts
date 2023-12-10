import { NextRequest } from "next/server";
import { createAttendeeRecord, getAttendeeRecords } from "@/lib/attendee-utils";

export async function GET(request: NextRequest) {
  const attendees = await getAttendeeRecords();

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
    const attendee = await createAttendeeRecord(data);
    return new Response(JSON.stringify(attendee, null, 2), {
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
