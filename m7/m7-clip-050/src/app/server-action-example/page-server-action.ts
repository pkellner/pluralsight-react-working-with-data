"use server";

import prisma from "@/lib/prisma/prisma";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

export async function addAttendeeAction(formData: FormData) {
  
  const attendeeRec = {
    id: randomUUID() as string,
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    createdDate: new Date(),
  }
  await prisma.attendee.create({ data: attendeeRec, });
  redirect("/server-component-example");
}