import SpeakerFavoriteCountDisplay from "@/app/speakers-with-suspense/speaker-favorite-count-display";
import {Suspense} from "react";

export default function SpeakerFavoriteCount({ speakerId }: { speakerId: number}) {

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function fetchFavoriteCount() {
    const randomSleep = Math.floor(1000 + Math.random() * 5000) + 1;
    await sleep(randomSleep);
    const response = await fetch(`http://localhost:3000/api/speakers/${speakerId}`);
    const data = await response.json();
    return data.favoriteCount;
  }

  const favoriteCountPromise = fetchFavoriteCount();

  return <Suspense fallback={<div className="text-muted">Favorite Count: *</div>}>
    <SpeakerFavoriteCountDisplay favoriteCountPromise={favoriteCountPromise} />
  </Suspense>
}