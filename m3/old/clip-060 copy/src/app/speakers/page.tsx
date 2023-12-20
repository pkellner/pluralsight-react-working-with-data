"use client";
import { useEffect, useState } from "react";
import SpeakerDetail from "./speaker-detail";

export default function Speakers() {
  const speakers = [
    {
      id: 1124,
      firstName: "Douglas",
      lastName: "Crockford",
      company: "Virgule-Solidus",
      twitterHandle: "douglas-does-not-tweet",
      userBioShort:
        "Douglas Crockford discovered the JSON Data Interchange Format.",
      timeSpeaking: new Date("1970-01-01T00:00:00.000Z"),
    },
    {
      id: 1269,
      firstName: "Arun",
      lastName: "Gupta",
      company: "Couchbase",
      twitterHandle: "arungupta",
      userBioShort:
        "Arun Gupta is a Principal Open Source Technologist at Amazon Web Services.",
      timeSpeaking: new Date("1970-01-01T00:00:00.000Z"),
    },
    {
      id: 187,
      firstName: "Dave",
      lastName: "Nielsen",
      company: "Intel",
      twitterHandle: "@davenielsen",
      userBioShort:
        "As Head of Ecosystem Programs, Dave uses emerging technologies and open source projects like Microservices, Serverless & Kubernetes to bring the magic of Redis to the broader community.",
      timeSpeaking: new Date("1970-01-01T00:00:00.000Z"),
    },
  ];
  const [speakerList, setSpeakerList] = useState<any>([]);

  useEffect(() => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    async function go() {
      await sleep(3000);
      setSpeakerList(speakers);
    }
    go();
  }, []);

  return (
    <div className="container">
      <div className="row g-4">
        {speakerList.map(function (speaker: any) {
          return <SpeakerDetail key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
