import React, { Suspense } from "react";
import SpeakerList from "./speaker-list";
import SpeakerDetailLoading from "./speaker-detail-loading";

function SpeakerListLoading() {
  return (
    <div className="container mt-3">
      <div className="row">
        {[1, 2, 3].map((id) => (
          <SpeakerDetailLoading key={id} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="container mt-3">
      <h1>Conference Speakers</h1>
      <Suspense fallback={<SpeakerListLoading />}>
        <SpeakerList />
      </Suspense>
    </div>
  );
}
 