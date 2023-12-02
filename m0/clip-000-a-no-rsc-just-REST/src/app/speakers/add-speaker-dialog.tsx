import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";

export default function AddSpeakerDialog({
  updateSpeaker,
  createSpeaker,
}: {
  updateSpeaker: (speaker: any) => void;
  createSpeaker: (speaker: any) => void;
}) {
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
      <SpeakerModal
        updateSpeaker={updateSpeaker}
        createSpeaker={createSpeaker}
      />
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
