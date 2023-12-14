"use server";

import { revalidatePath } from "next/cache";
import { createGUID } from "@/lib/general-utils";
import prisma from "@/lib/prisma/prisma";

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function addAttendeeAction(
  prevState: any,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const id = formData.get("id") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  await sleep(2000);

  if (id && id.length > 0) {
    await prisma.attendee.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    revalidatePath("/");

    return {
      message: "Updated attendee " + email,
      step: "DONE",
    };

  }

  const attendee = {
    id: createGUID(),
    email: email,
    firstName: "_firstName_",
    lastName: "_lastName_",
    createdDate: new Date(),
  };

  try {
    const count = await prisma.attendee.count({
      where: {
        email: email,
      },
    });
    if (count > 0) {
      return { message: "error: email already exists so no need to add again" };
    }

    const newAttendee = await prisma.attendee.create({
      data: attendee,
    });
    revalidatePath("/");
    // when we pass back an id, it will be used to update the attendee in step2.
    return {
      message: `The email ${email ?? "unknown"} has been subscribed for updates.`,
      step: "STEP2",
      id: newAttendee.id,
    };
  } catch (e) {
    return { message: "error: Failed to create attendee from action" };
  }
}
