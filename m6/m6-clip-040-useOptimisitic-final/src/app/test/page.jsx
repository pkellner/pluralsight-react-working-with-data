'use client';
import { useOptimistic, useState, useRef } from "react";


function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  async function formAction(formData) {
    setOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, setOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages(function(messages) {
      return [...messages, { text: sentMessage + "!!" }];
    });
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}

async function deliverMessage(message) {
  //throw new Error("Failed to deliver message");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}
