"use client";
import React from "react";

export default function SpeakerDetailPending() {
  return (

      <div className="col-xl-6 col-md-12">
        <div className="animate-opacity-for-pending">
        <div className="card border-0 h-100">
          <div className="row g-0">
            <div className="col-4">
              <img
                src="/images/speaker-pending.png"
                alt="speakers downloading..."
                className="speaker-image img-fluid speaker-rounded-corners"
              />
            </div>

            <div className="col-8 d-flex flex-column flex-nowrap">
              <div className="card-body">
                <div className="speaker-action d-flex"></div>
                <h4 className="card-title bg-gradient-pending-text">
                  <span className="invisible-text">firstName lastName</span>
                </h4>
                <p className="card-text bg-gradient-pending-text">
                  <span className="invisible-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
