"use server";

import prisma from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export async function addAttendeeAction(
  prevState: { message: string},
  formData: FormData,
) {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));

  try {
    const attendeeRec = {
      id: randomUUID(),
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      createdDate: new Date(),
    };

    await prisma.attendee.create({
      data: attendeeRec,
    });

    return {
      ...prevState,
      firstName: "",
      lastName: "",
      email: "",
      message: `Attendee ${attendeeRec.firstName} ${attendeeRec.lastName} / ${attendeeRec.email} added successfully!`,
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // Handle the unique constraint violation
      return {
        ...prevState,
        firstName: formData.get("email"),
        lastName: formData.get("firstName"),
        email: "",
        message: `error: An attendee with the email ${formData.get("email")} already exists.`,
      };
    } else {
      // Handle other errors
      return {
        ...prevState,
        firstName: formData.get("email"),
        lastName: formData.get("firstName"),
        email: formData.get("email"),
        message: "error: An error occurred while adding the attendee.",
      };
    }
  }
}
