import React, { useState, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface AttendeeFormProps {
  attendee: Attendee;
  onSave: (attendee: Attendee) => void;
  onCancel: () => void;
}

export default function AttendeeForm({ attendee, onSave, onCancel }: AttendeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: attendee.firstName,
    lastName: attendee.lastName,
    email: attendee.email
  });
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validateEmail(formData.email)) {
      setError('Invalid email address');
      return;
    }
    setError('');
    onSave({ ...attendee, ...formData });
  };

  return (
    <div className="container mt-3">
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
      <button onClick={handleSubmit} className="btn btn-primary mt-2">Save</button>
      <button onClick={onCancel} className="btn btn-secondary mt-2 ml-2">Cancel</button>
    </div>
  );
}
