import prisma from "@/lib/prisma/prisma";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";

export default function ServerActionExample() {

  async function addAttendeeAction(formData: FormData) {
    "use server";
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

  return (
    <div className="container m-2 p-4 rounded-2 bg-dark-subtle">
      <form action={addAttendeeAction}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="form-control" name="firstName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}