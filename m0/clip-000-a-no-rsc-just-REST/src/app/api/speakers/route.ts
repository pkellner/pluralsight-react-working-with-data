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

  console.log(speakers);

  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY ?? "",
    },
  });

  // return new Response(null, { status: 404 });
}
