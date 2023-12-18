import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createGUID } from "@/lib/general-utils";

// Types for the wizard steps
type Step = "STEP1" | "STEP2";

// FooterSubscribe component
export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [attendeeIdGuid, setAttendeeIdGuid] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<Step>("STEP1");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  useEffect(() => {
    const isValidEmail = email.match(/\S+@\S+\.\S+/);
    setIsButtonDisabled(!isValidEmail);
  }, [email]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (currentStep === "STEP1") {
      try {
        const postData = {
          id: createGUID(),
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
        setAttendeeIdGuid(data.id);
        if (response.ok) {
          setCurrentStep("STEP2");
        } else {
          alert(`Failed to subscribe ${email}. Please try again.`);
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep === "STEP2") {
      try {
        const putData = {
          id: attendeeIdGuid,
          email: email,
          firstName: firstName,
          lastName: lastName,
        };
        const response = await fetch(`/api/attendees/${attendeeIdGuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(putData),
        });

        if (response.ok) {
          alert("Subscription updated successfully.");
          setCurrentStep("STEP1");
          setEmail("");
          setFirstName("");
          setLastName("");
        } else {
          alert("Failed to update subscription. Please try again.");
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setCurrentStep("STEP1");
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  return (
    <>
      <h5 className="text-uppercase mb-4">Stay Updated</h5>
      <form onSubmit={handleSubmit}>
        {currentStep === "STEP1" && (
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
        )}
        {currentStep === "STEP2" && (
          <>
            <div className="mb-3">
              <div className="text">Email: {email}</div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            <div className="d-flex justify-content-start gap-2">
              <button
                type="submit"
                className="btn btn-outline-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              <button onClick={handleCancel} className="btn btn-outline-dark">
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
