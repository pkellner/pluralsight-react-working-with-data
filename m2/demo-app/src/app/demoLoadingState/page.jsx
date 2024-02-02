'use client';
import SpeakerList from "./speaker-list";

export default function Page() {
  return (
    <div className="container mt-3">
      <h1>Conference Speakers</h1>
      <SpeakerList />
    </div>
  );
}
