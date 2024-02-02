import React, {useState} from "react";

export default function SpeakerFavorite({ speaker }) {

  const [speakerLocal, setSpeakerLocal] = useState(speaker);
  const [updating, setUpdating] = useState(false);


  async function toggleFavorite() {
    // this assume no one else is updating the same speaker at any time
    try {
      setUpdating(true);
      const updatedSpeaker = { ...speakerLocal, favorite: !speakerLocal.favorite };
      const response = await fetch(`http://localhost:3000/api/speakers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpeaker),
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (response.ok) {
        setSpeakerLocal(updatedSpeaker);
      }
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
          onClick={toggleFavorite}
          alt="Favorite"
        />
      )}
    </>
  );
}
