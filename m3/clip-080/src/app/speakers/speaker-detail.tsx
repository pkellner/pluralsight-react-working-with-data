export default function SpeakerDetail({ speaker }: any) {
  const handleImageError = (e: any) => {
    e.target.src = "/images/speaker-pending.png"; // default speaker
  };

  return (
    <div className="col-xl-6 col-ms-12">
      <div className="card border-0 h-100">
        <div className="row g-0">
          <div className="col-4">
            <img
              src={`/images/speaker-${speaker.id}.jpg`}
              width={200}
              height={200}
              className="img-fluid speaker-rounded-corners speaker-image"
              alt={`${speaker?.firstName} ${speaker?.lastName}`}
              onError={handleImageError}
            />
          </div>

          <div className="col-8 d-flex flex-column flex-nowrap">
            <div className="card-body">
              <h4 className="card-title">
                {speaker.firstName} {speaker.lastName}
              </h4>
              <p className="card-text">{speaker.userBioShort}</p>
            </div>

            <div className="card-footer text-muted d-flex flex-wrap justify-content-between align-items-center">
              {speaker?.company?.length > 0 && (
                <small>
                  <strong>Company:</strong> {speaker.company}
                </small>
              )}

              {speaker?.twitterHandle?.length > 0 && (
                <small>
                  <strong>Twitter</strong>: {speaker.twitterHandle}
                </small>
              )}

              {speaker.timeSpeaking &&
                new Date(speaker.timeSpeaking).getTime() !==
                  new Date(0).getTime() && (
                  <small>
                    <strong>Time Speaking:</strong>{" "}
                    {new Date(speaker.timeSpeaking).toLocaleString()}
                  </small>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
