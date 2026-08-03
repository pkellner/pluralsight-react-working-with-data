import { useEffect, useState } from "react";

export default function SpeakerFavoriteCount({
  speakerId,
}: {
  speakerId: number;
}) {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [error, setError] = useState<string | undefined>("");
  const [loadingStatus, setLoadingStatus] = useState<string>("loading");

  useEffect(() => {
    async function go() {
      await fetchFavoriteCount();
    }
    go();
  }, []);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function fetchFavoriteCount() {
    const randomSleep = Math.floor(1000 + Math.random() * 2000) + 1;
    await sleep(randomSleep);
    try {
      const response = await fetch(
        `http://localhost:3000/api/speakers/${speakerId}`,
      );
      const data = await response.json();
      setFavoriteCount(data.favoriteCount);
      setLoadingStatus("success");
    } catch (error: any) {
      setError(error?.message ?? "");
      setLoadingStatus("error");
    }
  }

  if (loadingStatus === "error") {
    return <div className="text-danger">{error}</div>;
  }

  if (loadingStatus === "loading") {
    return (
      <div>
        <button disabled className="btn btn-primary m-3">
          Refresh
        </button>
        <span className="text-muted">Favorite Count: *</span>
      </div>
    );
  }

  return (
    <div>
      <button
        className="btn btn-primary m-3"
        onClick={async function () {
          setFavoriteCount(0);
          setError("");
          setLoadingStatus("loading");
          await fetchFavoriteCount();
        }}
      >
        Refresh
      </button>
      <span className="text-info">Favorite Count: {favoriteCount}</span>
    </div>
  );
}
