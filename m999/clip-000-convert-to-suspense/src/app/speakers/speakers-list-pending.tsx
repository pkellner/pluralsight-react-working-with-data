"use client";
import React from "react";
import SpeakerDetailPending from "@/app/speakers/speaker-detail-pending";

export default function SpeakersListPending() {
  return (
    <div className="container">
      <div className="row g-4 p-4">
        {[1, 2, 3, 4, 5].map((id) => (
          <SpeakerDetailPending key={id} />
        ))}
      </div>
    </div>
  );
}
