import React from "react";

import SpeakersModalHeader from "./speaker-modal-header";
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import SpeakerModalFooter from "@/app/speakers/speaker-modal/speaker-modal-footer";
import SpeakerModalBody from "@/app/speakers/speaker-modal/speaker-modal-body";

export default function SpeakerModal({updateSpeaker, createSpeaker} : {
  updateSpeaker: (speaker: any) => void;
  createSpeaker: (speaker: any) => void;
}) {
  const { modalShow } = useSpeakerModalContext();

  const cssShowHide =
    modalShow && modalShow
      ? "modal show-modal has-backdrop"
      : "modal hide-modal";

  return (
    <div role="dialog" className={cssShowHide}>
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0"
          style={{
            backgroundColor: "#EEEEEE",
          }}
        >
          <SpeakersModalHeader />
          <SpeakerModalBody />
          <SpeakerModalFooter updateSpeaker={updateSpeaker} createSpeaker={createSpeaker} />
        </div>
      </div>
    </div>
  );
}
