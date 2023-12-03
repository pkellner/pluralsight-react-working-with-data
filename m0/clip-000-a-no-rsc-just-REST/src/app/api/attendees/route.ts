import prisma from "@/lib/prisma/prisma";

export async function GET(request: Request) {
  const attendees = await prisma.attendee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdDate: true,
    },
    orderBy: [
      { lastName: "asc" },
      { firstName: "asc" }
    ]
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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating attendee" }), { status: 500 });
  }
}
