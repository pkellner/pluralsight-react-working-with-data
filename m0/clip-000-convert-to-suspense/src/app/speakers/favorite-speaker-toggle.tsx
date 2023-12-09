import { useEffect, useState } from "react";
import { Speaker } from "@/lib/general-types";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function FavoriteSpeakerToggle({
  speakerId,
}: {
  speakerId: number;
}) {
  const [loadingStatus, setLoadingStatus] = useState("success"); // default to loading
  const [error, setError] = useState<string | undefined>(); // error state
  const { isLoggedIn } = useLocalAuthContext();

  const { speakerList, setSpeakerList, updateSpeaker } =
    useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerList.find((value) => value.id === speakerId) ?? ({} as Speaker); // this should always be a real speaker

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoggedIn) {
    return (
      <span title="Log in to favor speakers">
        <button
          className={
            speakerRec?.favorite
              ? "heart-red-button btn"
              : "heart-dark-button btn"
          }
          disabled
        >
          {loadingStatus === "loading" ? (
            <i className="spinner-border text-dark" role="status" />
          ) : (
            <span className="m-2 text-primary">
              ({/*{speakerRec?.favoriteCount}*/}
              <span>FAVORITE COUNT</span>)
            </span>
          )}
        </button>
      </span>
    );
  }

  return (
    <button
      className={
        speakerRec?.favorite ? "heart-red-button btn" : "heart-dark-button btn"
      }
      onClick={(e) => {
        e.preventDefault();
        const newSpeakerRec: Speaker = {
          ...speakerRec,
          favorite: !speakerRec?.favorite,
        };
        setLoadingStatus("loading");
        updateSpeaker(newSpeakerRec, () => {
          setLoadingStatus("success");
        });
      }}
    >
      {loadingStatus === "loading" ? (
        <i className="spinner-border text-dark" role="status" />
      ) : (
        <span className="m-2 text-primary">({speakerRec?.favoriteCount})</span>
      )}
    </button>
  );
}
