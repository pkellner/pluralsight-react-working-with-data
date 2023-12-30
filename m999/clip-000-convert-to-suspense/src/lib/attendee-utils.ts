import prisma from "@/lib/prisma/prisma";
import { Attendee } from "@/lib/general-types";

export async function getAttendeeRecords() {
  return prisma.attendee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdDate: true,
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
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
  const ret = await prisma.$transaction(async (prisma) => {
    await prisma.attendeeFavorite.deleteMany({
      where: { attendeeId: id },
    });
    attendeeRecordDeleted = await prisma.attendee.delete({
      where: { id } as any, // not sure why we need this cast
    });
  });
  return attendeeRecordDeleted;
}

export async function createAttendeeRecord(attendee: Attendee) {
  const { id, firstName, lastName, email, createdDate } = attendee;

  return prisma.attendee.create({
    data: {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdDate: createdDate,
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
