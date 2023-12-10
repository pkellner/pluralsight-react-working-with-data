// DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER DANGER
// This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const speakerId = Number(params.id);

  // DANGER: This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.
  const authorization = request.cookies.get("authToken");
  if (
    !(authorization && authorization.value && authorization.value.length > 0)
  ) {
    throw new Error("No authorization token found");
  }

  // don't need first and last, but we do need attendeeId (just included for debugging and logging if needed)
  const { firstName, lastName, attendeeId } = getValuesFromToken(
    authorization.value,
  );

  const attendeeFavoriteRec = await prisma.attendeeFavorite.findMany({
    where: {
      attendeeId: attendeeId ?? "",
      speakerId: Number(speakerId),
    },
  });

  return new Response(JSON.stringify(attendeeFavoriteRec, null, 2), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const speakerId = Number(params.id);

  // DANGER: This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.
  const authorization = request.cookies.get("authToken");
  if (
    !(authorization && authorization.value && authorization.value.length > 0)
  ) {
    throw new Error("No authorization token found");
  }

  // don't need first and last, but we do need attendeeId (just included for debugging and logging if needed)
  const { firstName, lastName, attendeeId } = getValuesFromToken(
    authorization.value,
  );

  const attendeeFavoriteRec = await prisma.attendeeFavorite.deleteMany({
    where: {
      attendeeId: attendeeId ?? "",
      speakerId: Number(speakerId),
    },
  });

  return new Response(null, { status: 204 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const speakerId = Number(params.id);

  // DANGER: This authentication is purely for demo purpose and is absolutely not secure. Do not use this in any kind of production app.
  const authorization = request.cookies.get("authToken");
  if (
    !(authorization && authorization.value && authorization.value.length > 0)
  ) {
    throw new Error("No authorization token found");
  }

  // don't need first and last, but we do need attendeeId (just included for debugging and logging if needed)
  const { firstName, lastName, attendeeId } = getValuesFromToken(
    authorization.value,
  );

  const attendeeFavoriteRec = await prisma.attendeeFavorite.create({
    data: {
      attendeeId: attendeeId ?? "",
      speakerId: Number(speakerId),
    },
  });

  return new Response(JSON.stringify(attendeeFavoriteRec, null, 2), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
