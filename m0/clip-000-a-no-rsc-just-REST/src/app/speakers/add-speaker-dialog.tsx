import {useSpeakerModalContext} from "@/components/contexts/speaker-modal-context";
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
  } = useSpeakerModalContext();

  return (
    <>
      <SpeakerModal />
      <button
        onClick={() => {
          setModalSpeakerId(0);
          setModalSpeakerFirstName("");
          setModalSpeakerLastName("");
          setModalSpeakerCompany("");
          setModalSpeakerTwitterHandle("");
          setModalUserBioShort("");
          setModalSpeakerTimeSpeaking(new Date());
          setModalShow(true);
        }}
        className="btn btn-accent"
      >
        Add Speaker <i className="fa fa-plus" />
      </button>
    </>
  );
}
