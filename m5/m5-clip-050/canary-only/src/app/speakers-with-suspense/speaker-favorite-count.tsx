import { useState, useMemo } from "react";
import SpeakerFavoriteCountDisplay from "@/app/speakers-with-suspense/speaker-favorite-count-display";
import { Suspense } from "react";
import ErrorBoundary from "@/app/error-boundary";

export default function SpeakerFavoriteCount({
  speakerId,
}: {
  speakerId: number;
}) {
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
  const [dependency, setDependency] = useState(0);
  const favoriteCountPromise = useMemo(
    () => fetchFavoriteCount(),
    [dependency],
  );
  return (
    <ErrorBoundary
      fallback={
        <div className="text-danger">Error Occurred when loading Favorite Count..</div>
      }
    >
      <Suspense fallback={<SuspenseFallback />}>
        <div>
          <button
            className="btn btn-primary m-3"
            onClick={() => setDependency(dependency + 1)}
          >
            Refresh
          </button>
          <SpeakerFavoriteCountDisplay
            favoriteCountPromise={favoriteCountPromise}
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

function SuspenseFallback() {
  return (
    <div>
      <button disabled className="btn btn-primary m-3">
        Refresh
      </button>
      <span className="text-muted">Favorite Count: *</span>
    </div>
  );
}
