import SpeakerList from "./speaker-list";
import { Suspense } from "react";
import SpeakerDetailLoading from "../demoLoadingState/speaker-detail-loading";

function SpeakerListLoading() {
  return (
    <div className="container mt-3">
      <div className="row">
        {[1, 2].map((id) => (
          <SpeakerDetailLoading key={id} />
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  return (
    <div className="container mt-3">
      <h1>Conference Speakers</h1>
      <Suspense fallback={<SpeakerListLoading />}>
        <SpeakerList  />
      </Suspense>
    </div>
  );
}
