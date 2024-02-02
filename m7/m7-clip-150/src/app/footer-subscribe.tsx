"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import addAttendeeAction from "@/app/footer-subscribe-action";

function ButtonSubmitStep1({ buttonDisabled }: { buttonDisabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-outline-dark"
      disabled={buttonDisabled}
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </button>
  );
}

function ButtonSubmitStep2() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-outline-dark" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </button>
  );
}

// FooterSubscribe component
export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const initialState = {
    step: "STEP1",
    message: "",
    id: "",
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  useEffect(() => {
    const isValidEmail = email.match(/\S+@\S+\.\S+/);
    setButtonDisabled(!isValidEmail);
  }, [email]);

  const handleCancel = () => {
    window.location.reload();
  };

  const [state, formAction] = useFormState(addAttendeeAction, initialState);

  const whichStep = state.step;

  return (
    <>
      <h5 className="text-uppercase mb-4">Stay Updated</h5>
      <form action={formAction}>
        {whichStep === "STEP1" && (
          <div className="d-flex">
            <input
              type="email"
              name="email"
              className="form-control me-2"
              placeholder="Email address"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <ButtonSubmitStep1 buttonDisabled={buttonDisabled} />
          </div>
        )}
        {whichStep === "STEP2" && (
          <>
            <input type="hidden" name="id" value={state.id} />
            <div className="mb-3">
              <div className="text">Email: {email}</div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            <div className="d-flex justify-content-start gap-2">
              <ButtonSubmitStep2 />
              <button
                onClick={handleCancel}
                type="button"
                className="btn btn-outline-dark"
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {error && <div className="text-danger">{error}</div>}
        {whichStep === "DONE" && "Thank you for subscribing!"}
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
    </>
  );
}
