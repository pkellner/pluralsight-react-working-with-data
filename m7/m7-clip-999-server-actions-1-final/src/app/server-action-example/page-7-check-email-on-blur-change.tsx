"use client";
import { AddNewAttendeeActionFromClientWithZod } from "@/app/server-action-example/page-server-action-from-client-with-zod";
import { ServerActionSubmitButton } from "@/app/server-action-example/page-server-action-submit-button";
import { useFormState } from "react-dom";
import EmailInput from "@/app/server-action-example/email-input";

export default function ServerActionExample() {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(
    AddNewAttendeeActionFromClientWithZod,
    initialState,
  );

  return (
    <div className="container mt-5">
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
        <EmailInput />
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
