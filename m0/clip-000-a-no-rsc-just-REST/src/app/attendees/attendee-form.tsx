import React, { ChangeEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface AttendeeFormProps {
  formData: { firstName: string; lastName: string; email: string };
  setFormData: (formData: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

export default function AttendeeForm({
  formData,
  setFormData,
}: AttendeeFormProps) {
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email" && !validateEmail(e.target.value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="container m-3 p-1">
      {error && <p className="text-danger">{error}</p>}
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
