import SpeakerFavorite from "./speaker-favorite";
import React from "react";

export default function SpeakerDetail({ speaker }) {
  return (
    <div className="col-4">
      <div className="card">
        <img
          src={`/images/speaker-${speaker.id}.jpg`}
          alt={`${speaker.firstName} ${speaker.lastName}`}
          className="card-img-top"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{visibility: "visible"}}>
            {speaker.firstName} {speaker.lastName} 
          </h5>
          <ul className="list-unstyled">
            <li>
              <SpeakerFavorite speaker={speaker} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
