"use server";
import { Speaker } from "@/lib/general-types";
import {
  createSpeakerRecord,
  deleteSpeakerRecord,
  getSpeakerDataById,
  updateSpeakerRecord,
} from "@/lib/prisma/speaker-utils";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";




const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function createSpeakerAction(speakerData: Speaker) {
  await sleep(1000);
  return await createSpeakerRecord(speakerData);
}

export async function updateSpeakerAction(
  speakerData: Speaker,
) {
  await sleep(1000);

  const authSessionData: { user?: { id: string; email: string } } | null =
    await getServerSession(authOptions);

  const originalSpeaker = await getSpeakerDataById(speakerData.id, authSessionData?.user?.id);
  const updatedSpeaker = await updateSpeakerRecord(speakerData, authSessionData?.user?.id);
  return { originalSpeaker, updatedSpeaker };
}

export async function deleteSpeakerAction(speakerId: number) {
  await sleep(1000);
  return await deleteSpeakerRecord(speakerId);
}
