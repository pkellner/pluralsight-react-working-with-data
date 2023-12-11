"use server";
import { Attendee } from "@/lib/general-types";
import {
  createAttendeeRecord,
  deleteAttendeeRecord,
  getOneAttendeeRecord,
  updateAttendeeRecord
} from "@/lib/attendee-utils";


const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function createAttendeeAction(attendeeData: Attendee) {
  await sleep(1000);
  return await createAttendeeRecord(attendeeData);
}

export async function updateAttendeeAction(
  attendeeId: string,
  attendeeData: Attendee,
) {
  await sleep(1000);
  const originalAttendee = await getOneAttendeeRecord(attendeeId);
  const updatedAttendee = await updateAttendeeRecord(attendeeData);
  return { originalAttendee, updatedAttendee };
}

export async function deleteAttendeeAction(attendeeId: string) {
  await sleep(1000);
  return await deleteAttendeeRecord(attendeeId);
}
