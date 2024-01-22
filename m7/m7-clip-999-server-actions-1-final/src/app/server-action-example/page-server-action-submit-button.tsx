"use client";

import { useFormStatus } from "react-dom";

export function ServerActionSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}
