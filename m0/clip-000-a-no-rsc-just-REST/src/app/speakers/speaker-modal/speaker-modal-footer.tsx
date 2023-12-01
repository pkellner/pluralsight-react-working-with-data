import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import { Speaker } from "@/lib/general-types";

export default function SpeakerModalFooter({updateSpeaker, createSpeaker} : {
  updateSpeaker: (speaker: Speaker) => void;
  createSpeaker: (speaker: Speaker) => void;
}) {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerCompany, // New addition
    modalSpeakerTwitterHandle, // New addition
    modalUserBioShort, // Changed from modalSpeakerBioShort
  } = useSpeakerModalContext();

  console.log("SpeakerModalFooter: updateSpeaker Type:", typeof updateSpeaker);



  return (
    <div className="modal-footer justify-content-center">
      {modalSpeakerId !== 0 && (
        <button
          onClick={() => {
            updateSpeaker({
              id: modalSpeakerId,
              firstName: modalSpeakerFirstName,
              lastName: modalSpeakerLastName,
              company: modalSpeakerCompany,
              twitterHandle: modalSpeakerTwitterHandle,
              userBioShort: modalUserBioShort,
            });
            setModalShow(false);
          }}
          className="float-left btn btn-accent"
        >
          Save
        </button>
      )}

      <button
        className="btn btn-danger"
        onClick={() => setModalShow(false)}
        data-dismiss="modal"
      >
        Discard
      </button>

      {modalSpeakerId === 0 && (
        <button
          className="btn btn-accent"
          onClick={() => {
            createSpeaker({
              firstName: modalSpeakerFirstName,
              lastName: modalSpeakerLastName,
              company: modalSpeakerCompany,
              twitterHandle: modalSpeakerTwitterHandle,
              userBioShort: modalUserBioShort,
            });
            setModalShow(false);
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}
