'use client';
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";

export default function SpeakerModalFooter() {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerCompany, // New addition
    modalSpeakerTwitterHandle, // New addition
    modalUserBioShort, // Changed from modalSpeakerBioShort
  } = useSpeakerModalContext();

  const { data, createSpeaker, updateSpeaker } = {
    data: [],
    updateSpeaker: (speaker: any) => {},
    createSpeaker: (speaker: any) => {},
  };

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
              favorite: false,
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
