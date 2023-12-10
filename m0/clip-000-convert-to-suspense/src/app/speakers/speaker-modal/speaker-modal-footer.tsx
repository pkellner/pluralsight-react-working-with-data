import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import { useState } from "react";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

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
            // console.log(
            //   "/src/app/speakers/speaker-modal/speaker-modal-footer.tsx: SpeakerModalFooter(): modalSpeakerId, modalSpeakerFirstName, modalSpeakerLastName, modalSpeakerCompany, modalSpeakerTwitterHandle, modalUserBioShort, modalSpeakerTimeSpeaking, modalSpeakerFavorite: ",
            //   modalSpeakerId,
            //   modalSpeakerFirstName,
            //   modalSpeakerLastName,
            //   modalSpeakerCompany,
            //   modalSpeakerTwitterHandle,
            //   modalUserBioShort,
            //   modalSpeakerTimeSpeaking,
            //   modalSpeakerFavorite,
            // );
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
