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

  const attendee = {
    id: createGUID(),
    email: email,
    firstName: "_firstName_",
    lastName: "_lastName_",
    createdDate: new Date(),
  };

  try {
    await sleep(3000);

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
    console.log(
      "/app/actions.ts: addAttendeeAction: newAttendee:",
      newAttendee,
    );
    revalidatePath("/");
    return { message: "Added attendee " + email };
  } catch (e) {
    console.log("/app/actions.ts: addAttendeeAction: e:", e);
    return { message: "error: Failed to create attendee from action" };
  }
}
