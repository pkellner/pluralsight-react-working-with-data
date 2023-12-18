"use server";
import { Speaker } from "@/lib/general-types";
import {
  createSpeakerRecord,
  deleteSpeakerRecord,
  getSpeakerDataById,
  updateSpeakerRecord,
} from "@/lib/speaker-utils";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function createSpeakerAction(speakerData: Speaker) {
  await sleep(1000);
  return await createSpeakerRecord(speakerData);
}

export async function updateSpeakerAction(
  speakerData: Speaker,
  attendeeId?: string | undefined,
) {
  await sleep(1000);
  const originalSpeaker = await getSpeakerDataById(speakerData.id, attendeeId);
  const updatedSpeaker = await updateSpeakerRecord(speakerData, attendeeId);
  return { originalSpeaker, updatedSpeaker };
}

export async function deleteSpeakerAction(speakerId: number) {
  await sleep(1000);
  return await deleteSpeakerRecord(speakerId);
}