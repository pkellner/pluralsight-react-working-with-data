import React from "react";

export default function FavoriteSpeaker({speaker}) {


  async function toggleFavorite(id) {
    const speakerIndex = speakers.findIndex((speaker) => speaker.id === id);
    const speaker = speakers[speakerIndex];
    const updatedSpeaker = { ...speaker, favorite: !speaker.favorite };

    try {
      const response = await fetch(`http://localhost:3000/api/speakers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpeaker),
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (response.ok) {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[speakerIndex] = updatedSpeaker;
        setSpeakers(updatedSpeakers);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img
    src={`/images/${
      speaker.favorite ? "heart-red.png" : "heart-dark.png"
    }`}
    onClick={() => toggleFavorite(speaker.id)}
    alt="Favorite"
  />;
}