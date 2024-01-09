import {use, useMemo, useState} from "react";

export default async function SpeakerFavoriteCountDisplay({speakerId}: {speakerId: number}) {

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function fetchFavoriteCount() {
    const randomSleep = Math.floor(1000 + Math.random() * 2000) + 1;
    await sleep(randomSleep);
    if (randomSleep > 100000)
      throw new Error("Took too long to fetch favorite count");
    const response = await fetch(
      `http://localhost:3000/api/speakers/${speakerId}`,
    );
    const data = await response.json();
    return data.favoriteCount;
  }


  // const favoriteCountPromise = fetchFavoriteCount();
  const favoriteCount = await fetchFavoriteCount();

  return <span className="text-info">Favorite Count: {favoriteCount}</span>;
}
