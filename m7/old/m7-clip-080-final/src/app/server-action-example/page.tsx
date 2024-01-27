"use client";

import { addAttendeeAction } from "@/app/server-action-example/page-server-action";
import { useFormState, useFormStatus } from "react-dom";
import { ChangeEvent, useEffect, useState } from "react";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ServerActionExample() {
  const initialValue: {
    message: string;
    firstName: string;
    lastName: string;
    email: string;
  } = {
    message: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [state, formAction] = useFormState(addAttendeeAction, initialValue);

  const [formData, setFormData] = useState<IFormData>({
    firstName: state.firstName as string,
    lastName: state.lastName as string,
    email: state.email as string,
  });

  useEffect(() => {
    setFormData({
      firstName: state.firstName as string,
      lastName: state.lastName as string,
      email: state.email as string,
    });
  }, [state]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" aria-disabled={pending} className="btn btn-primary">
        {pending ? "Adding..." : "Add"}
      </button>
    );
  }

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
            value={formData.firstName}
            onChange={handleChange}
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
            value={formData.lastName}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
