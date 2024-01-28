"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { addAttendeeAction } from
  "@/app/server-action-example/page-server-action";
import SubmitButton from
  "@/app/server-action-example/submit-button";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ServerActionExample() {
  const initialState: {
    message: string;
    firstName: string;
    lastName: string;
    email: string;
  } = { message: "", firstName: "", lastName: "", email: "" };

  const [state, formAction] =
    useFormState(addAttendeeAction, initialState);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
  });

  useEffect(() => {
    setFormData({
      firstName: state.firstName as string,
      lastName: state.lastName as string,
      email: state.email as string,
    });
  },[state]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              state.message.startsWith("error") ?
                "text-danger" : "text-muted"
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </div>
  );
}
