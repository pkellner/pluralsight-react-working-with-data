import { Attendee } from "../general-types";
import prisma from "./prisma";
import { randomUUID } from "node:crypto";

export async function getAttendeeRecords() {
  return prisma.attendee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdDate: true,
    },
    orderBy: [
      { createdDate: "desc" },
      { lastName: "asc" },
      { firstName: "asc" },
    ],
  });
}

export async function updateAttendeeRecord(attendee: Attendee) {
  const { id, firstName, lastName, email } = attendee;
  return prisma.attendee.update({
    where: { id },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
  });
}

export async function deleteAttendeeRecord(id: string) {
  let attendeeRecordDeleted;
  await prisma.$transaction(async function (prisma: any) {
    await prisma.attendeeFavorite.deleteMany({
      where: { attendeeId: id },
    });

    attendeeRecordDeleted = await prisma.attendee.delete({
      where: { id },
    });
  });
  return attendeeRecordDeleted;
}

export async function createAttendeeRecord(attendee: Attendee) {
  const { id, firstName, lastName, email, createdDate } = attendee;

  return prisma.attendee.create({
    data: {
      id: id ?? randomUUID(),
      firstName: firstName ?? "Unknown",
      lastName: lastName ?? "Unknown",
      email: email,
      createdDate: createdDate ?? new Date(),
    },
  });
}

export async function getOneAttendeeRecord(id: string) {
  return prisma.attendee.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdDate: true,
    },
  });
}
