// Import prisma from the prisma client
import prisma from "@/lib/prisma/prisma";

// This function handles the GET request
export async function GET(request: Request) {
  try {
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
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const data = await request.json();

    const updatedSpeaker = await prisma.speaker.update({
      where: { id: parseInt(id ?? "0") },
      data,
    });

    return new Response(JSON.stringify(updatedSpeaker, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating speaker" }), { status: 500 });
  }
}

// This function handles the POST request
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newSpeaker = await prisma.speaker.create({
      data,
    });

    return new Response(JSON.stringify(newSpeaker, null, 2), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating speaker" }), { status: 500 });
  }
}

// This function handles the DELETE request
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');

    await prisma.speaker.delete({
      where: { id: parseInt(id ?? "0") },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting speaker" }), { status: 500 });
  }
}
