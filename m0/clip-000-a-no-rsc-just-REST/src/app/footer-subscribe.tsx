import React, { useEffect, useState } from "react";
import {createGUID} from "@/lib/general-utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const isValidEmail = email.match(/\S+@\S+\.\S+/);
    setIsButtonDisabled(!isValidEmail);
  }, [email]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);



    try {
      const postData = {
        id: createGUID(),
        email: email,
        firstName: "_firstName_",
        lastName: "_lastName_",
        createdDate: new Date(),
      };
      const response = await fetch("/api/attendees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      await sleep(1000);

      if (response.ok) {
        alert(
          `${email} has been subscribed. You should get an email confirming that.`,
        );
      } else {
        alert(`Failed to subscribe ${email}. Please try again.`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setEmail("");
    }
  };

  return (
    <>
      <h5 className="text-uppercase mb-4">Stay Updated</h5>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            type="email"
            className="form-control me-2 speaker-rounded-corners"
            placeholder="Email address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            type="submit"
            className="btn btn-outline-dark speaker-rounded-corners"
            disabled={isButtonDisabled || isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </>
  );
}
