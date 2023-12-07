import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";

export default function AddSpeakerDialog() {
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
