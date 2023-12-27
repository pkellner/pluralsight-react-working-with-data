import { useState } from "react";
import { Speaker } from "@/lib/general-types";
import {useSpeakerDataContext} from "@/contexts/speaker-data-context";

export default function SpeakerFavoriteToggle({
  speakerId,
}: {
  speakerId: number;
}) {
  const [loadingStatus, setLoadingStatus] = useState("success"); // default to loading

  const { speakerState, updateSpeaker } = useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerState.speakerList.find((value) => value.id === speakerId) ?? ({} as Speaker); // this should always be a real speaker

  return (
    <div>
      <button
        className={
          speakerRec?.favorite
            ? "heart-red-button btn"
            : "heart-dark-button btn"
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
          <span className="m-2 text-primary">
            ({speakerRec?.favoriteCount})
          </span>
        )}
      </button>
    </div>
  );
}
