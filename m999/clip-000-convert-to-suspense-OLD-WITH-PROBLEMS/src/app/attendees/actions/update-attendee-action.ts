"use server";
import { Attendee } from "@/lib/general-types";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma/prisma";

export async function updateAttendeeAction(attendeeRec: Attendee) {
  console.log("updateAttendeeAction: attendeeRec:", attendeeRec);

  const attendeeMany = await prisma.attendee.findMany();
  console.log(
    "findMany: attendeeMany:",
    attendeeMany && attendeeMany.length > 3
      ? attendeeMany.slice(0, 3)
      : " none found",
  );

  console.log("update-attendee-action.ts: attendeeRec.id:", attendeeRec.id);

  const attendee = await prisma.attendee.findUnique({
    where: {
      id: attendeeRec.id,
    },
  });
  console.log("findUnique: attendee:", attendee);

  const updatedAttendee = await prisma.attendee.update({
    where: {
      id: attendeeRec.id,
    },
    data: {
      firstName: attendeeRec.firstName,
      lastName: attendeeRec.lastName,
      email: attendeeRec.email,
    },
  });

  console.log("updateAttendeeAction: updatedAttendee:", updatedAttendee);

  console.log("updateAttendeeAction: revalidatePath('/attendees');");
  revalidatePath("/attendees");
}
