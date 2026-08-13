import SpeakerFavoriteCountDisplay from "@/app/speakers-with-suspense-server-only/speaker-favorite-count-display";
import { Suspense } from "react";
import ErrorBoundary from "@/app/error-boundary";

//export const dynamic = "force-dynamic";

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

export default function SpeakerFavoriteCount({
  speakerId,
}: {
  speakerId: number;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-danger">
          Error Occurred when loading Favorite Count..
        </div>
      }
    >
      <Suspense fallback={<SuspenseFallback />}>
        <form>
          <button className="btn btn-primary m-3">Refresh</button>
          <SpeakerFavoriteCountDisplay speakerId={speakerId} />
        </form>
      </Suspense>
    </ErrorBoundary>
  );
}
