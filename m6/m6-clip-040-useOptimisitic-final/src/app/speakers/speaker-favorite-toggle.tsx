import { useState } from "react";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import { useSession } from "next-auth/react";

export default function SpeakerFavoriteToggle({
  speaker,
}: {
  speaker: Speaker;
}) {
  const [loadingStatus, setLoadingStatus] = useState("success"); // default to loading

  const { data: session } = useSession();

  const { updateSpeaker } = useSpeakerDataContext();

  const [speakerLocal, setSpeakerLocal] = useState<Speaker>(speaker);

  const [speakerOptimistic, setSpeakerOptimistic] =
    useState<Speaker>(speakerLocal);

  const updatedSpeakerRec: Speaker = {
    ...speakerOptimistic,
    favorite: !speakerOptimistic?.favorite,
    favoriteCount:
      (speakerOptimistic?.favoriteCount ?? 0) +
      (speakerOptimistic?.favorite ? -1 : 1),
  };

  return (
    <div>
      <button
        disabled={!session?.user?.email}
        className={
          speakerOptimistic?.favorite
            ? "heart-red-button btn"
            : "heart-dark-button btn"
        }
        onClick={(e) => {
          e.preventDefault();
          setSpeakerOptimistic(updatedSpeakerRec);
          setLoadingStatus("loading");
          updateSpeaker(
            updatedSpeakerRec,
            () => {
              setLoadingStatus("success");
            },
            () => {
              setLoadingStatus("error");
              setSpeakerOptimistic(speakerLocal);
            },
          );
        }}
      >
        {loadingStatus === "loading" ? (
          <>
            <span className="m-2 text-primary" style={{ opacity: 50 }}>
              ({speakerOptimistic?.favoriteCount})
            </span>
            <i className="spinner-border text-dark" role="status" />{" "}
          </>
        ) : (
          <>
            <span className="m-2 text-primary">
              ({speakerOptimistic?.favoriteCount})
            </span>
            <i
              className="spinner-border text-dark"
              role="status"
              style={{ opacity: 0 }}
            />{" "}
          </>
        )}
      </button>
    </div>
  );
}
