import { useState } from "react";


export default function FavoriteSpeakerToggle({ speakerRec  }: { speakerRec: any  }) {
  const { updateSpeaker } = {
    updateSpeaker: (speaker: any) => {},
  }
  const [updating, setUpdating] = useState<boolean>(false);

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
        setUpdating(true);
        updateSpeaker(newSpeakerRec);
      }}
    >
      {updating ? (
        <i className="spinner-border text-dark" role="status" />
      ) : null}
    </button>
  );
}
