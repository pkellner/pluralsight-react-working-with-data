import {useEffect, useState} from "react";
import {Speaker} from "@/lib/general-types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FavoriteSpeakerToggle({ speakerRec  }: { speakerRec: any  }) {
  const { updateSpeaker } = {
    updateSpeaker: (speaker: any) => {},
  }

  const [speaker, setSpeaker] = useState<Speaker>();
  const [loadingStatus, setLoadingStatus] = useState("loading"); // default to loading
  const [error, setError] = useState<string | undefined>(); // error state


  useEffect(() => {
    async function fetchSpeaker() {
      try {
        const response = await fetch(`/api/speakers/${speakerRec.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        await sleep(1000 + Math.random() * 2000);
        setSpeaker(data);
        setLoadingStatus("success");
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error in fetch SpeakersList", err);
          setError(err.message);
        } else {
          console.error("An unexpected error occurred");
          setError("An unexpected error occurred");
        }
        setLoadingStatus("error");
      }
    }
    fetchSpeaker().then(() => {});
  }, []);


  return (
    <button
      className={
        speakerRec.favorite ? "heart-red-button btn" : "heart-dark-button btn"
      }
      onClick={(e) => {
        e.preventDefault();
        const newSpeakerRec = {
          ...speakerRec,
          favorite: !speakerRec.favorite,
        };
        setLoadingStatus("loading");
        updateSpeaker(newSpeakerRec);
      }}
    >
      {loadingStatus === "loading" ? (
        <i className="spinner-border text-dark" role="status" />
      ) : (<span className="m-2 text-primary">({speaker?.favoriteCount})</span>)}
    </button>
  );
}
