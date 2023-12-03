import {useSpeakerModalContext} from "@/components/contexts/speaker-modal-context";
import {isoStringDateToPrismaDate, prismaDateToIsoString} from "@/lib/date-utilities";

export default function SpeakerModalBody() {
  const {
    modalSpeakerId,
    modalSpeakerFirstName,
    setModalSpeakerFirstName,
    modalSpeakerLastName,
    setModalSpeakerLastName,
    modalSpeakerCompany,
    setModalSpeakerCompany,
    modalSpeakerTwitterHandle,
    setModalSpeakerTwitterHandle,
    modalUserBioShort,
    setModalUserBioShort,
    modalSpeakerTimeSpeaking,
    setModalSpeakerTimeSpeaking,
  } = useSpeakerModalContext();

  const speakingTime = prismaDateToIsoString(modalSpeakerTimeSpeaking, true);

  return (
    <div className="modal-body">
      <div className="notes-box">
        <div className="notes-content">
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="note-title">
                  <label>Speaker Id:</label>
                  <span>{modalSpeakerId}</span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>First Name</label>
                  <input
                    value={modalSpeakerFirstName}
                    onChange={(event) => setModalSpeakerFirstName(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>Last Name</label>
                  <input
                    value={modalSpeakerLastName}
                    onChange={(event) => setModalSpeakerLastName(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>Company</label>
                  <input
                    value={modalSpeakerCompany}
                    onChange={(event) => setModalSpeakerCompany(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>Twitter Handle</label>
                  <input
                    value={modalSpeakerTwitterHandle}
                    onChange={(event) => setModalSpeakerTwitterHandle(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="@twitterhandle"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>Time Speaking</label>
                  <input
                    value={speakingTime}
                    // onChange={(event) => setModalSpeakerTimeSpeaking(new Date(event.target.value))}
                    onChange={(event) => setModalSpeakerTimeSpeaking(isoStringDateToPrismaDate(event.target.value))}
                    type="datetime-local"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-title">
                  <label>Short Bio</label>
                  <textarea
                    value={modalUserBioShort}
                    onChange={(event) => setModalUserBioShort(event.target.value)}
                    className="form-control"
                    placeholder="speaker bio..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
