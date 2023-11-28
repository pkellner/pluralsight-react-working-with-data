import { speakers } from "../../../../db.json";

export async function GET(request: Request) {
  //const userId = parseInt(req.params.userId);
  // const user = users.find((u) => u.id === userId);

  console.log("data", speakers);

  return new Response(JSON.stringify(speakers, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      'API-Key': process.env.DATA_API_KEY ?? "",
    },
  });

  // return new Response(null, { status: 404 });
}
