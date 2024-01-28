import React, { ChangeEvent, useState } from "react";
import { FormDataType } from "@/app/server-action-example/page";
import { CheckEmailExistsAction } from "@/app/server-action-example/page-server-action";

export default function EmailInput({
  formData: { email },
  onChange,
}: {
  formData: FormDataType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [emailInDatabase, setEmailInDatabase] = useState(false);

  const onBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;

    setEmailInDatabase(await CheckEmailExistsAction(emailValue));
  };

  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email Address
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={email}
        onChange={onChange}
        onBlur={onBlur}
      />
      {emailInDatabase && (
        <div className="text-danger">Email address exists already</div>
      )}
    </div>
  );
}
