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
import { z } from "zod";

const SpeakerSchema = z.object({
  id: z.number().optional(), // needed because we sometimes pass in no id to mean this gets added
  firstName: z
    .string()
    .min(1, "First name is required"),
  lastName: z
    .string()
    .min(2, "Last name is required"),
  company: z.string().optional(),
  twitterHandle: z.string().optional(),
  userBioShort: z.string().optional(),
  timeSpeaking: z.date(),
});

const sleep = (milliseconds: number) => {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds),
  );
};

export async function createSpeakerAction(
  speakerData: Speaker,
) {
  await sleep(1000);

  const validatedFields =
    SpeakerSchema.safeParse(speakerData);
  if (!validatedFields.success) {
    let errorMessage = "";
    validatedFields.error.issues.forEach(
      (issue) =>
        (errorMessage += `${issue.path[0]}:${issue.message};`),
    );
    throw new Error(errorMessage);
    // return {
    //   message: errorMessage,
    //   step: "ERROR",
    // };
  }

  return await createSpeakerRecord(
    speakerData,
  );
}

export async function updateSpeakerAction(
  speakerData: Speaker,
) {
  await sleep(1000);

  const validatedFields =
    SpeakerSchema.safeParse(speakerData);
  if (!validatedFields.success) {
    let errorMessage = "";
    validatedFields.error.issues.forEach(
      (issue) =>
        (errorMessage += `${issue.path[0]}:${issue.message};`),
    );
    throw new Error(errorMessage);
    // return {
    //   message: errorMessage,
    //   step: "ERROR",
    // };
  }

  const authSessionData: {
    user?: { id: string; email: string };
  } | null =
    await getServerSession(authOptions);

  const originalSpeaker =
    await getSpeakerDataById(
      speakerData.id,
      authSessionData?.user?.id,
    );
  const updatedSpeaker =
    await updateSpeakerRecord(
      speakerData,
      authSessionData?.user?.id,
    );
  return { originalSpeaker, updatedSpeaker };
}

export async function deleteSpeakerAction(
  speakerId: number,
) {
  await sleep(1000);
  return await deleteSpeakerRecord(
    speakerId,
  );
}
