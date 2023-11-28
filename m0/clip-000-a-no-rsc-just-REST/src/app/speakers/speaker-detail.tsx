"use client";

import Image from "next/image";

export default function SpeakerDetail({ speakerRec }: { speakerRec: any }) {
  return (
    <SpeakerModalProvider>
      {speakerRec && <SpeakerModal />}
      <div className="col-xl-6 col-md-12">
        <div className="card border-0">
          <div className="row g-0">
            <div className="col-4">
              <img
                src={`/images/Speaker-${speakerRec.id}.jpg`}
                width={200}
                height={200}
                className="img-fluid speaker-rounded-corners speaker-image"
                alt={`${speakerRec?.firstName} ${speakerRec?.lastName}`}
              />
            </div>

            <div className="col-8 d-flex flex-column flex-nowrap">
              <div className="card-body">
                <div className="speaker-action d-flex">
                  <div className="favoriteToggleWrapper">
                    <FavoriteSpeakerToggle speakerRec={speakerRec} />
                  </div>

                  <div className="modifyWrapper">
                    <EditSpeakerDialog {...speakerRec} />
                    <DeleteSpeakerButton id={speakerRec.id} />
                  </div>
                </div>
                <h4 className="card-title">
                  {speakerRec.firstName} {speakerRec.lastName}
                </h4>
              </div>

              <div className="card-footer text-muted d-flex flex-wrap justify-content-between align-items-center">
                {speakerRec?.company?.length > 0 ? (
                  <small>
                    <strong>Company:</strong> {speakerRec.company}
                  </small>
                ) : null}

                {speakerRec.twitterHandle.length > 0 ? (
                  <small>
                    <strong>Twitter</strong>: {speakerRec.twitterHandle}
                  </small>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpeakerModalProvider>
  );
}
