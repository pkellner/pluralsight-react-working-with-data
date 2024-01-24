"use client";
import { AddNewAttendeeActionFromClientWithZod } from "@/app/server-action-example/page-server-action-from-client-with-zod";
import { ServerActionSubmitButton } from "@/app/server-action-example/page-server-action-submit-button";
import { useFormState } from "react-dom";

export default function ServerActionExample() {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(
    AddNewAttendeeActionFromClientWithZod,
    initialState,
  );

  return (
    <div className="container m-5 p-2 rounded-2 bg-dark-subtle">
      <form action={formAction}>
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

        {state.message && (
          <div
            className={`mt-2 ${
              state.message.startsWith("error") ? "text-danger" : "text-info"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
