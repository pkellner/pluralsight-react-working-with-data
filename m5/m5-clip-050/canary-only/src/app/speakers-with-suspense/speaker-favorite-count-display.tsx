import { use } from "react";

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

export default function SpeakerFavoriteCountDisplay({
  favoriteCountPromise,
}: {
  favoriteCountPromise: Promise<number>;
}) {
  const favoriteCount: number = use(favoriteCountPromise);

  return <span className="text-info">Favorite Count: {favoriteCount}</span>;
}
