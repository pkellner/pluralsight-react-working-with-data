import { useSpeakerModalContext } from "@/contexts/speaker-modal-context";

export default function SpeakerDialogAdd() {
  const {
    setModalShow,
    setModalSpeakerId,
    setModalSpeakerFirstName,
    setModalSpeakerLastName,
    setModalSpeakerCompany,
    setModalSpeakerTwitterHandle,
    setModalUserBioShort,
    setModalSpeakerTimeSpeaking,
    setModalSpeakerFavorite,
  } = useSpeakerModalContext();

  return (
    <>
      <button
        onClick={() => {
          setModalSpeakerId(0);
          setModalSpeakerFirstName("");
          setModalSpeakerLastName("");
          setModalSpeakerCompany("");
          setModalSpeakerTwitterHandle("");
          setModalUserBioShort("");
          setModalSpeakerTimeSpeaking(new Date(0)); // 0 time, jan 1, 1970 12:00 AM
          setModalShow(true);
          setModalSpeakerFavorite(false);
        }}
        className="btn btn-accent"
      >
        Add Speaker <i className="fa fa-plus" />
      </button>
    </>
  );
}
