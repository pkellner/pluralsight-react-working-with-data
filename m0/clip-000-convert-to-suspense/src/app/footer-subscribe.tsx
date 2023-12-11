"use client";
import React from "react";
import addAttendeeAction from "@/app/footer-subscribe-action";
import { useFormState, useFormStatus } from "react-dom";

export default function FooterSubscribe() {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(addAttendeeAction, initialState);

  const { pending } = useFormStatus();

  console.log("// Path: src/app/footer-subscribe.tsx: pending:",pending)

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
          <button
            type="submit"
            className="btn btn-outline-dark speaker-rounded-corners"
          >
            {pending ? "Subscribing..." : "Subscribe"}
          </button>
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
