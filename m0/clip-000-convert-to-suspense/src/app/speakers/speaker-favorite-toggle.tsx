import { useState } from "react";
import { Speaker } from "@/lib/general-types";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function SpeakerFavoriteToggle({
  speakerId,
}: {
  speakerId: number;
}) {
  const [loadingStatus, setLoadingStatus] = useState("success"); // default to loading
  const { isLoggedIn, loggedInAttendeeId } = useLocalAuthContext();

  const { speakerListOptimistic, updateSpeaker } = useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerListOptimistic.find((value) => value.id === speakerId) ??
    ({} as Speaker); // this should always be a real speaker

  if (!isLoggedIn) {
    return (
      <span title="Log in to favor speakers">
        <button className="heart-dark-button btn" disabled>
          {loadingStatus === "loading" ? (
            <i className="spinner-border text-dark" role="status" />
          ) : (
            <span className="m-2 text-primary">
              ({speakerRec?.favoriteCount})
            </span>
          )}
        </button>
      </span>
    );
  }

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
          updateSpeaker(newSpeakerRec, loggedInAttendeeId, function () {
            setLoadingStatus("success");
          });
        }}
      >
        <span className="m-2 text-primary">({speakerRec?.favoriteCount})</span>
        {loadingStatus === "loading" ? (
          <i className="spinner-border text-dark" role="status" />
        ) : null}
      </button>
    </div>
  );
}
