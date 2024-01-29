import { Attendee } from ".prisma/client";
import prisma from "@/lib/prisma/prisma";
import Link from "next/link";

export default async function ListAttendees() {
  const attendees =
    await prisma.attendee.findMany({
      orderBy: { createdDate: "desc" },
      take: 10,
    });

  return (
    <div className="table-responsive">
      <Link href={"/server-action-example"}>
        Back to form
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">
              Created Date - id
            </th>
          </tr>
        </thead>
        <tbody>
          {attendees.map(
            (attendee: Attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.firstName}</td>
                <td>{attendee.lastName}</td>
                <td>{attendee.email}</td>
                <td>
                  {attendee.createdDate.toLocaleTimeString()}{" "}
                  - {attendee.id}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
