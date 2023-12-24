import { Speaker } from "@/app/lib/general-types";

export default function SpeakerDetail({
  speakerList,
  speakerId,
}: {
  speakerList: Speaker[];
  speakerId: number;
}) {
  const handleImageError = (e: any) => {
    e.target.src = "/images/speaker-pending.png"; // Path to your default image
  };
  const speakerRec: Speaker =
    speakerList.find((value: Speaker) => value.id === speakerId) ??
    ({} as Speaker); // this should always be a real speaker

  return (
    <>
      <div className="col-xl-6 col-md-12">
        <div className="card border-0 h-100">
          <div className="row g-0">
            <div className="col-4">
              <img
                src={`/images/speaker-${speakerRec.id}.jpg`}
                width={200}
                height={200}
                className="img-fluid speaker-rounded-corners speaker-image"
                alt={`${speakerRec?.firstName} ${speakerRec?.lastName}`}
                onError={handleImageError}
              />
            </div>

            <div className="col-8 d-flex flex-column flex-nowrap">
              <div className="card-body">
                <h4 className="card-title">
                  {speakerRec.firstName} {speakerRec.lastName}
                </h4>
                <p className="card-text">{speakerRec.userBioShort}</p>
              </div>

              <div className="card-footer text-muted d-flex flex-wrap justify-content-between align-items-center">
                {speakerRec?.company?.length > 0 && (
                  <small>
                    <strong>Company:</strong> {speakerRec.company}
                  </small>
                )}

                {speakerRec?.twitterHandle?.length > 0 && (
                  <small>
                    <strong>Twitter</strong>: {speakerRec.twitterHandle}
                  </small>
                )}

                {speakerRec.timeSpeaking &&
                  new Date(speakerRec.timeSpeaking).getTime() !==
                    new Date(0).getTime() && (
                    <small>
                      <strong>Time Speaking:</strong>{" "}
                      {new Date(speakerRec.timeSpeaking).toLocaleString()}
                    </small>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}