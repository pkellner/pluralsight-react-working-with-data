import { useSpeakerModalContext } from "@/contexts/speaker-modal-context";

export default function SpeakerModalHeader() {
  const { setModalShow, modalSpeakerId } =
    useSpeakerModalContext();
  return (
    <div className="modal-header bg-main-gradient text-white">
      <h5 className="modal-title">
        {modalSpeakerId === 0 ? (
          <span>Add Speaker</span>
        ) : (
          <span>Edit Speaker</span>
        )}
      </h5>
      <button
        type="button"
        onClick={() => {
          setModalShow(false);
        }}
        className="btn btn-sm text-dark"
        data-dismiss="modal"
        aria-label="close"
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
}
