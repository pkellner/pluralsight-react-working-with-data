import { randomUUID } from "node:crypto";
import prisma from "@/lib/prisma/prisma";
import { redirect } from "next/navigation";

export async function AddNewAttendeeAction(formData: FormData) {
  "use server";

  await new Promise<void>(resolve => setTimeout(resolve, 2000));

  const attendeeRec = {
    id: randomUUID() as string,
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    createdDate: new Date(),
  };

  await prisma.attendee.create({
    data: attendeeRec,
  });

  redirect("/server-component-example");
}
