"use server";
import prisma from "@/lib/prisma/prisma";
import { Prisma } from ".prisma/client";
import { z } from "zod";

type FormState = {
  message: string;
};

const AttendeeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(3),
  id: z.string().uuid().optional(),
});

export async function AddNewAttendeeActionFromClientWithZod(
  prevState: FormState,
  formData: FormData,
) {
  const result = AttendeeSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!result.success) {
    console.log("/server-action-example/page-server-action-from-client-with-zod.ts:", result.error.issues[0].message);
    return {
      ...prevState,
      message: `Validation error: ${result.error.issues[0].message}`,
    };
  }

  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  try {
    const attendeeRec = {
      id: crypto.randomUUID(),
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
      firstName: "initial first name",
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
        message: "error: An attendee with this email already exists.",
      };
    } else {
      // Handle other errors
      return {
        ...prevState,
        message: "error: An error occurred while adding the attendee.",
      };
    }
  }
}

// redirect("/server-component-example");
