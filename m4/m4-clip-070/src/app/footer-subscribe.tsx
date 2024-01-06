import { useState, ChangeEvent, FormEvent } from "react";

export default function FooterSubscribe() {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        alert("Failed to update subscription. Try again later");
      }
    } catch (error) {
      console.log("Error in fetch:", error);
      alert("An error occured. Try again later");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
