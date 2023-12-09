"use server";
import { Speaker } from "@/lib/general-types";
import {
  getSpeakerDataById,
  updateSpeakerRecord,
} from "@/lib/prisma/speaker-utils";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function updateSpeakerAction(
  speakerId: number,
  speakerData: Speaker,
  attendeeId?: string | undefined,
) {
  await sleep(1000);
  const originalSpeaker = await getSpeakerDataById(speakerId, attendeeId);
  const updatedSpeaker = await updateSpeakerRecord(speakerData, attendeeId);
  return { originalSpeaker, updatedSpeaker };
}
