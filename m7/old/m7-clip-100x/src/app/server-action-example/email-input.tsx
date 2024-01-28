import React, { ChangeEvent } from "react";
import { FormDataType } from "@/app/server-action-example/page";

export default function EmailInput({
  formData: { email },
  onChange,
}: {
    formData: FormDataType;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }) {
  
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email Address
      </label>
      <input type="email" className="form-control" id="email" name="email"
        value={email} onChange={onChange} />
    </div>
  );
}