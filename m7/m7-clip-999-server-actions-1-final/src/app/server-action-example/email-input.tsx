'use client';



import React, { useState } from "react";
import { EmailInDb } from "@/app/server-action-example/page-server-action-from-client-with-zod";

export default function EmailInput() {

  const [emailInDatabase, setEmailInDatabase] = useState<boolean>(false);

  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email Address
      </label>
      <input type="email" className="form-control" id="email" name="email"
             onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
               const emailValue : string = event.target.value
               const emailInDatabase : boolean = await EmailInDb(emailValue);
               if (emailInDatabase) {
                 setEmailInDatabase(true);
               } else {
                 setEmailInDatabase(false);
               }
             }}
      />
      {emailInDatabase && (
        <div className="text-danger">Email address exists already</div>
      )}
    </div>
  );
}
