import { useState, useOptimistic } from "react";
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
  const { speakerState, updateSpeaker } = useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerState.speakerList.find((value) => value.id === speakerId) ??
    ({} as Speaker); // this should always be a real speaker

  const [speakerRecOptimistic, setSpeakerRecOptimistic] =
    useState<Speaker>(speakerRec);

  return (
    <div>
      <button
        disabled={!session?.user?.email}
        className={
          speakerRecOptimistic?.favorite
            ? "heart-red-button btn"
            : "heart-dark-button btn"
        }
        onClick={(e) => {
          e.preventDefault();
          const updatedSpeakerRec: Speaker = {
            ...speakerRec,
            favorite: !speakerRec?.favorite,
            favoriteCount:
              (speakerRec?.favoriteCount ?? 0) +
              (speakerRec?.favorite ? -1 : 1),
          };
          setSpeakerRecOptimistic(updatedSpeakerRec);
          setLoadingStatus("loading");
          updateSpeaker(updatedSpeakerRec, () => {
            setLoadingStatus("success");
          });
        }}
      >
        <>
          <span className={`m-2 text-primary`}>
            {speakerRecOptimistic?.favoriteCount}
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
