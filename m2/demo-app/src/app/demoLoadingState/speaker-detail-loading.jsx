import SpeakerFavorite from "./speaker-favorite";
import React from "react";

export default function SpeakerDetailLoading() {
  return (
    <div className="col-4">
      <div className="card">
        <div className="speaker-image-placeholder"></div>
        <div className="card-body">
          <h5 className="card-title" style={{visibility: "hidden"}}>
            {"espsum"} {"dolor"}
          </h5>
          <ul className="list-unstyled">
            <li>
              <div className="speaker-favorite-placeholder"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
