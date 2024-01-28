import { NextRequest } from "next/server";
import {
  createAttendeeRecord,
  getAttendeeRecords,
} from "@/lib/prisma/attendee-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await sleep(3000);
  const attendees = await getAttendeeRecords();
  return new Response(JSON.stringify(attendees, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  await sleep(3000);
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
    console.log("POST:ERROR", error);
    return new Response(
      JSON.stringify({ message: "Error creating attendee" }),
      { status: 500 },
    );
  }
}
