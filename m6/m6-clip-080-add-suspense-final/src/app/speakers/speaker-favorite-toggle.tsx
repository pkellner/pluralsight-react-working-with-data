"use client";
import { useState } from "react";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/contexts/speaker-data-context";
import { useSession } from "next-auth/react";

export default function SpeakerFavoriteToggle({
  speakerId,
}: {
  speakerId: number;
}) {
  const [loadingStatus, setLoadingStatus] = useState("success");

  const { data: session } = useSession();

  const { updateSpeaker, speakerState } = useSpeakerDataContext();
  const { speakerList } = speakerState;

  const latestSpeakerRec: Speaker =
    speakerList.find((rec: Speaker) => rec.id === speakerId) ?? ({} as Speaker);

  const [speakerOptimistic, setSpeakerOptimistic] =
    useState<Speaker>(latestSpeakerRec);

  const updatedSpeakerRec: Speaker = {
    ...latestSpeakerRec,
    favorite: !latestSpeakerRec?.favorite,
    favoriteCount:
      (latestSpeakerRec?.favoriteCount ?? 0) +
      (latestSpeakerRec?.favorite ? -1 : 1),
  };

  return (
    <div>
      <button
        disabled={!session?.user}
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
              setSpeakerOptimistic(latestSpeakerRec);
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
