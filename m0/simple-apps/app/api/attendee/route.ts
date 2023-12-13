// /app/attendee/route.ts
import { PrismaClient } from '@prisma/client';
import { type NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  // Here you could use your token if necessary
  // const token = request.cookies.get('token');

  // Get all attendees
  const attendees = await prisma.attendee.findMany();
  return new Response(JSON.stringify(attendees, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: NextRequest) {
  // Parse the request body to get the new attendee data
  const data = await request.json();
  const { email, firstName, lastName } = data;

  // Insert the new attendee into the database
  const newAttendee = await prisma.attendee.create({
    data: { email, firstName, lastName },
  });

  return new Response(JSON.stringify(newAttendee, null, 2), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/*
Prisma Model:

model Attendee {
  id        String   @id @default(uuid())
  email     String   @unique
  firstName String
  lastName  String
  created   DateTime @default(now())
  updatedAt DateTime @updatedAt
}

 */
