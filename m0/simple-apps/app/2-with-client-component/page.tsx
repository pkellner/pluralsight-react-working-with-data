import "server-only";

import { PrismaClient } from "@prisma/client";
import React from "react";
import {revalidatePath} from "next/cache";
import prisma from "@/prisma/prisma-client";
import DeleteAttendee from "@/app/2-with-client-component/delete-attendee";



export default async function AttendeesPage() {

  //const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function deleteAttendee(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.attendee.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
  }

  const attendees = await prisma.attendee.findMany();

  // Render the data as a table with checkboxes
  return (
    <table>
      <thead>
        <tr>
          <th>Delete</th>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {attendees.map((attendee : any) => (
          <tr key={attendee.id}>
            <td>
              <form action={deleteAttendee}>
                <input type="hidden" name="id" value={attendee.id} />
                <DeleteAttendee />
              </form>
            </td>
            <td>{attendee.id}</td>
            <td>{attendee.email}</td>
            <td>{attendee.firstName}</td>
            <td>{attendee.lastName}</td>
            <td>{attendee.created.toDateString()}</td>
            <td>{attendee.updatedAt.toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
