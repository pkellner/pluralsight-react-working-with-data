import { useSpeakerModalContext } from "@/contexts/speaker-modal-context";

function prismaDateToIsoString(
  incomingPrismaDate: any,
  stripTimezoneOffset = false,
) {
  try {
    const startTimeLocal = new Date(incomingPrismaDate);
    let offset = startTimeLocal.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const adjustedDate = new Date(startTimeLocal.getTime() - offset); // Add the offset

    return stripTimezoneOffset
      ? adjustedDate.toISOString().slice(0, 16)
      : adjustedDate.toISOString();
  } catch (e) {
    console.log("prismaDateToIsoString: Error converting date:", e);
    const errorDate = new Date();
    return stripTimezoneOffset
      ? errorDate.toISOString().slice(0, 16)
      : errorDate.toISOString();
  }
}

function isoStringDateToPrismaDate(incomingDate: string | Date) {
  try {
    return typeof incomingDate === "string"
      ? new Date(incomingDate)
      : incomingDate;
  } catch (error) {
    console.log("Error converting date:", error);
    return incomingDate as Date;
  }
}

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
                    onChange={(event) =>
                      setModalSpeakerFirstName(event.target.value)
                    }
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
                    onChange={(event) =>
                      setModalSpeakerLastName(event.target.value)
                    }
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
                    onChange={(event) =>
                      setModalSpeakerCompany(event.target.value)
                    }
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
                    onChange={(event) =>
                      setModalSpeakerTwitterHandle(event.target.value)
                    }
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
                    onChange={(event) => {
                      setModalSpeakerTimeSpeaking(
                        isoStringDateToPrismaDate(event.target.value),
                      );
                    }}
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
                    onChange={(event) =>
                      setModalUserBioShort(event.target.value)
                    }
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
