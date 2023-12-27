import {useState} from "react";
import {useSpeakerDataContext} from "@/contexts/speaker-data-context";
import {useSpeakerModalContext} from "@/contexts/speaker-modal-context";

export default function SpeakerModalFooter() {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerCompany,
    modalSpeakerTwitterHandle,
    modalUserBioShort,
    modalSpeakerTimeSpeaking,
    modalSpeakerFavorite,
  } = useSpeakerModalContext();

  const { updateSpeaker, createSpeaker } = useSpeakerDataContext();

  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  return (
    <div className="modal-footer justify-content-center">
      {modalSpeakerId !== 0 && (
        <button
          onClick={() => {
            setUpdating(true);
            updateSpeaker(
              {
                id: modalSpeakerId,
                firstName: modalSpeakerFirstName,
                lastName: modalSpeakerLastName,
                company: modalSpeakerCompany,
                twitterHandle: modalSpeakerTwitterHandle,
                userBioShort: modalUserBioShort,
                timeSpeaking: modalSpeakerTimeSpeaking,
                favorite: modalSpeakerFavorite,
              },
              () => {
                setUpdating(false); // so that when opening again, it's not disabled and not showing "saving...
                setModalShow(false);
              },
            );
          }}
          className="float-left btn btn-accent"
          disabled={updating}
        >
          {updating ? "Saving..." : "Save"}
        </button>
      )}

      <button
        className="btn btn-danger"
        onClick={() => {
          setModalShow(false);
        }}
        data-dismiss="modal"
      >
        Discard
      </button>

      {modalSpeakerId === 0 && (
        <button
          className="btn btn-accent"
          disabled={adding}
          onClick={() => {
            setAdding(true);
            createSpeaker(
              {
                id: modalSpeakerId,
                firstName: modalSpeakerFirstName,
                lastName: modalSpeakerLastName,
                company: modalSpeakerCompany,
                twitterHandle: modalSpeakerTwitterHandle,
                userBioShort: modalUserBioShort,
                timeSpeaking: modalSpeakerTimeSpeaking,
                favorite: modalSpeakerFavorite,
              },
              () => {
                setAdding(false);
                setModalShow(false);
              },
            );
          }}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      )}
    </div>
  );
}
