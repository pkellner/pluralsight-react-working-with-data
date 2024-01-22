import { AddNewAttendeeAction } from "@/app/server-action-example/page-server-action";
import { ServerActionSubmitButton } from "@/app/server-action-example/page-server-action-submit-button";

export default function ServerActionExample() {

  return (
    <div className="container mt-5">
      <form action={AddNewAttendeeAction}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
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
        <ServerActionSubmitButton />
      </form>
    </div>
  );
}
