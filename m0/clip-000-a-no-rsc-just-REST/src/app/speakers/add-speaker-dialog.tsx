import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import SpeakerModal from "@/app/speakers/speaker-modal/speaker-modal";

export default function AddSpeakerDialog() {
  const {
    setModalShow,
    setModalSpeakerId,
    setModalSpeakerFirstName,
    setModalSpeakerLastName,
    setModalSpeakerEmail,
    setModalSpeakerImageUrl,
  } = useSpeakerModalContext();

  return (
    <>
      <SpeakerModal />
      <button
        onClick={() => {
          setModalSpeakerId(0);
          setModalSpeakerFirstName("");
          setModalSpeakerLastName("");
          setModalSpeakerEmail("");
          setModalSpeakerImageUrl("/images/speaker-new.jpg");
          setModalShow(true);
        }}
        className="btn btn-accent"
      >
        Add Speaker <i className="fa fa-plus" />
      </button>
    </>
  );
}
