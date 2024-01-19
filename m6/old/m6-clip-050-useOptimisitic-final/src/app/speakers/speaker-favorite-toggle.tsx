import { useState } from "react";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import { useSession } from "next-auth/react";

export default function SpeakerFavoriteToggle({
  speakerId,
}: {
  speakerId: number;
}) {
  const { data: session } = useSession(); // get authentication status
  const [loadingStatus, setLoadingStatus] = useState("success");
  const {
    speakerState,
    updateSpeaker,
    speakerListOptimistic,
    setSpeakerListOptimistic,
  } = useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerListOptimistic.find((value) => value.id === speakerId) ??
    ({} as Speaker); // this should always be a real speaker

  return (
    <div>
      <button
        disabled={!session?.user?.email}
        className={
          speakerRec?.favorite
            ? "heart-red-button btn"
            : "heart-dark-button btn"
        }
        onClick={(e) => {
          e.preventDefault();
          setLoadingStatus("loading");
          const updatedSpeakerRec: Speaker = {
            ...speakerRec,
            favorite: !speakerRec?.favorite,
          };
          updateSpeakerOptimistic(updatedSpeakerRec, () => {
            setLoadingStatus("success");
          });
        }}
      >
        <>
          <span
            className={`m-2 text-primary ${
              loadingStatus === "loading" ? "hide-modal" : ""
            }`}
          >
            {speakerRec?.favoriteCount}
          </span>
          <i
            className={`spinner-border text-dark ${
              loadingStatus === "loading" ? "" : "hide-modal"
            }`}
            role="status"
          />
        </>
      </button>
    </div>
  );
}
