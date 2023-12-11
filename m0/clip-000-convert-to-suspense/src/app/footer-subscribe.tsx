"use client";
import React from "react";
import addAttendeeAction from "@/app/footer-subscribe-action";
import { useFormState, useFormStatus } from "react-dom";


// for pending to work, this must be a child component of a form, not in the form itself
function SubmitButton() {

  const { pending } = useFormStatus();

  return <button
    type="submit"
    className="btn btn-outline-dark speaker-rounded-corners"
  >
    {pending ? "Subscribing..." : "Subscribe"}
  </button>;
}

export default function FooterSubscribe() {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(addAttendeeAction, initialState);

  return (
    <div>
      <h5 className="text-uppercase mb-4">Stay Updated</h5>
      <form action={formAction}>
        <div className="d-flex align-items-center">
          <input
            type="email"
            className="form-control me-2 speaker-rounded-corners"
            placeholder="Email address"
            required
            id="email"
            name="email"
          />
          <SubmitButton />
        </div>
        {state?.message && (
          <div
            className={`mt-3 text-${
              state.message.startsWith("error:") ? "danger" : "primary"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
