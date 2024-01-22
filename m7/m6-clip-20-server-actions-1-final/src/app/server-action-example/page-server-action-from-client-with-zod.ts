"use server";
import prisma from "@/lib/prisma/prisma";
import { Attendee, Prisma } from ".prisma/client";
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

  await new Promise<void>((resolve) => setTimeout(resolve, 2000));

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
      message: `Validation error: ${errorMessage}`,
    };
  }


  try {
    // Use the validated data directly from Zod
    const attendeeRec = {
      ...parsedData.data,
      id: crypto.randomUUID(),
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
