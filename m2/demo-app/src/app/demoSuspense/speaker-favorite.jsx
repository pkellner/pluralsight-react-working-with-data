import React, {useEffect, useState} from "react";
import speakerAction from "./speaker-action";

export default function SpeakerFavorite({ speaker }) {
  const [speakerLocal, setSpeakerLocal] = useState(speaker);
  const [updating, setUpdating] = useState(false);

  async function toggleFavorite() {
    try {
      setUpdating(true);
      const updatedSpeaker = {
        ...speakerLocal,
        favorite: !speakerLocal.favorite,
      };

      await speakerAction(updatedSpeaker);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSpeakerLocal(updatedSpeaker);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
    finally {
      setUpdating(false);
    }
  }

  return (
    <>
      {updating ? (
        <img src="/images/spinning.gif" width={25} alt={"busy"} />
      ) : (
        <img
          src={`/images/${
            speakerLocal.favorite ? "heart-red.png" : "heart-dark.png"
          }`}
          onClick={!updating ? toggleFavorite : undefined} // Disable onClick when updating
          alt="Favorite Toggle"
          style={{
            cursor: updating ? "default" : "pointer", // Change cursor based on updating status
          }}
        />
      )}
    </>
  );
}
