"use client";

import { addAttendeeAction } from "@/app/server-action-example/page-server-action";
import SubmitButton from "@/app/server-action-example/submit-button";
import { useFormState } from "react-dom";

export default function ServerActionExample() {
  const initialValue: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  } = { firstName: "", lastName: "", email: "", message: "" };

  const [state, formAction] = useFormState(addAttendeeAction, initialValue);

  return (
    <div className="container m-2 p-4 rounded-2 bg-dark-subtle">
      <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="form-control"
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
        <SubmitButton />
        {state.message && (
          <div
            className={`mt-2 ${
              state.message.startsWith("error") ? "text-danger" : "text-muted"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
