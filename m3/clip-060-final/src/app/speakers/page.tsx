"use client";
import { useState, useEffect } from "react";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";
import SpeakerDetail from "@/app/speakers/speaker-detail";
import { Speaker } from "@/app/lib/general-types";

const speakers: Speaker[] = [
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

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Speakers() {
  const [speakerList, setSpeakersList] = useState<Speaker[]>([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    async function go() {
      await sleep(5000);
      setSpeakersList(speakers);
      setLoadingStatus("loaded");
    }
    go().then(() => console.log("done"));
  }, []);

  if (loadingStatus === "loading") {
    return (
      <div className="container">
        <div className="row g-4">
          {[1, 2, 3].map((item) => (
            <SpeakerDetailPending key={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row g-4">
        {speakerList.map(({ id }) => (
          <SpeakerDetail key={id} speakerList={speakerList} speakerId={id} />
        ))}
      </div>
    </div>
  );
}
