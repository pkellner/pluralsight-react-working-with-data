"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma/prisma";

import { z } from 'zod';

const AttendeeSchema = z.object({
  id: z.string().nullable(),
  firstName: z.string().min(1, 'First name is required').nullable().optional(),
  lastName: z.string().min(1, 'Last name is required').nullable().optional(),
  email: z.string().email('Invalid email format').nullable().optional(),
});

type AttendeeZodType = z.infer<typeof AttendeeSchema>;

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default async function addAttendeeAction(
  prevState: any,
  formData: FormData,
) {


  // const email = formData.get("email") as string;
  // const id = formData.get("id") as string;
  // const firstName = formData.get("firstName") as string;
  // const lastName = formData.get("lastName") as string;

  const data : AttendeeZodType = {
    id: formData.get("id") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    // Add other fields if necessary
  };

  // Validate the data against the AttendeeSchema
  const validatedData = AttendeeSchema.parse(data);

  const { email, id, firstName, lastName } = validatedData;



  await sleep(2000);

  if (id && id.length > 0) {
    await prisma.attendee.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName ?? "",
        lastName: lastName ?? "",
      },
    });

    revalidatePath("/");

    return {
      message: "Updated attendee " + email,
      step: "DONE",
    };
  }

  function createGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  const attendee = {
    id: createGUID(),
    email: email ?? "",
    firstName: "_firstName_",
    lastName: "_lastName_",
    createdDate: new Date(),
  };

  try {
    const count = await prisma.attendee.count({
      where: {
        email: email ?? "",
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
      message: `The email ${
        email ?? "unknown"
      } has been subscribed for updates.`,
      step: "STEP2",
      id: newAttendee.id,
    };
  } catch (e) {
    return { message: "error: Failed to create attendee from action" };
  }
}
