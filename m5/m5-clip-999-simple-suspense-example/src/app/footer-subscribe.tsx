import React, { useState, ChangeEvent, FormEvent, useEffect,  }
  from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// FooterSubscribe component
export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] =
    useState<boolean>(true);

  const handleEmailChange =
    (event: ChangeEvent<HTMLInputElement>) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Subscription updated successfully");
        setEmail("");
      } else {
        alert("Failed to update subscription. Try again later.");
      }
    } catch (error) {
      console.log("Error in fetch:", error);
      alert("An error occured. Try again later");
    } finally {
      setIsSubmitting(false);
    }
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
