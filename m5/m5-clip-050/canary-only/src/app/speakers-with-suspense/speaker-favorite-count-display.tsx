import { use } from "react";

export default function SpeakerFavoriteCountDisplay({
  favoriteCountPromise,
}: {
  favoriteCountPromise: Promise<number>;
}) {
  const favoriteCount: number = use(favoriteCountPromise);

  return <span className="text-info">Favorite Count: {favoriteCount}</span>;
}
