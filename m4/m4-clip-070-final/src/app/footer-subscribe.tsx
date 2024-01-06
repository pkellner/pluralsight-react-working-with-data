import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

// FooterSubscribe component
export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const isValidEmail = email.match(/\S+@\S+\.\S+/);
    setIsButtonDisabled(!isValidEmail);
  }, [email]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        email: email,
        firstName: "",
        lastName: "",
        createdDate: new Date(),
      };
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Subscription updated successfully.");
        setEmail("");
      } else {
        alert("Failed to update subscription. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEmail("");
  };

  return (
    <>
      <h5 className="text-uppercase mb-4">Stay Updated</h5>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            type="email"
            className="form-control me-2"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            type="submit"
            className="btn btn-outline-dark"
            disabled={isButtonDisabled || isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </>
  );
}
