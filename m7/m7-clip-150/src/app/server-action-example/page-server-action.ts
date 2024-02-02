"use server";

import prisma from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function CheckEmailExistsAction(email: string): Promise<boolean> {
  await new Promise<void>((resolve) => setTimeout(resolve, 3000));
  const attendee = await prisma.attendee.findUnique({
    where: {
      email: email,
    },
  });
  return attendee !== null;
}

export async function addAttendeeAction(
  prevState: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  },
  formData: FormData,
) {
  await new Promise<void>((resolve) => setTimeout(resolve, 3000));

  const AttendeeSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(2),
    lastName: z.string().min(3),
    id: z.string().uuid().optional(),
  });

  const parsedData = AttendeeSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!parsedData.success) {
    let errorMessage = "";
    parsedData.error.issues.forEach(
      (issue) => (errorMessage += `${issue.path[0]}:${issue.message};`),
    );
    return {
      ...prevState,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      message: `error: validation: ${errorMessage}`,
    };
  }

  const attendeeRec = {
    ...parsedData.data,
    id: randomUUID() as string,
    createdDate: new Date(),
  };
  try {
    await prisma.attendee.create({
      data: attendeeRec,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ...prevState,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: "",
        message:
          `error: An attendee with the email ` +
          `${formData.get("email")} already exists.`,
      };
    } else {
      return {
        ...prevState,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        message: "error: An error occurred while adding attendee.",
      };
    }
  }

  return {
    ...prevState,
    firstName: "",
    lastName: "",
    email: "",
    message:
      `Attendee ${attendeeRec.firstName} ` +
      `${attendeeRec.lastName} / ` +
      `${attendeeRec.email} added successfully!`,
  };
}
