import prisma from "@/lib/prisma/prisma";

export async function GET(request: Request) {
  //const userId = parseInt(req.params.userId);
  // const user = users.find((u) => u.id === userId);

  // get all speakers from the sqlite database with prisma
  const speakers = await prisma.speaker.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      company: true,
      twitterHandle: true,
      userBioShort: true,
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
  try {
    const data = await request.json();
    console.log("POST data", data);
    const newSpeaker = await prisma.speaker.create({
      data,
    });

    return new Response(JSON.stringify(newSpeaker, null, 2), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating speaker" }), { status: 500 });
  }
}
