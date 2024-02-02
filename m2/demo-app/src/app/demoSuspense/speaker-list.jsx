"use client";
import SpeakerDetail from "./speaker-detail";

export default function SpeakerList({ speakers }) {
  return (
    <div className="container mt-3">
      <div className="row">
        {speakers.map((speaker) => (
          <SpeakerDetail speaker={speaker} key={speaker.id} />
        ))}
      </div>
    </div>
  );
}
