// This function handles the GET request

import {
  deleteAttendeeRecord,
  getOneAttendeeRecord,
  updateAttendeeRecord,
} from "@/lib/prisma/attendee-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await sleep(3000);
  try {
    const attendee = await getOneAttendeeRecord(params.id);

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

// This function handles the PUT request
export async function PUT(request: Request) {
  await sleep(3000);
  try {
    // const id = request.url.split("/").pop();
    const data = await request.json();

    const updatedAttendee = await updateAttendeeRecord(data);

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
    return new Response(
      JSON.stringify({ message: "Error updating attendee" }),
      {
        status: 500,
      },
    );
  }
}

// This function handles the DELETE request
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  await sleep(3000);
  try {
    // Start a transaction
    await deleteAttendeeRecord(id);

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting attendee" }),
      {
        status: 500,
      },
    );
  }
}
