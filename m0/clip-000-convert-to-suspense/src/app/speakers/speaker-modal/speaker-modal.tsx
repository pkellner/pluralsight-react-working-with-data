"use client";

import React from "react";

import SpeakersModalHeader from "./speaker-modal-header";
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import SpeakerModalFooter from "@/app/speakers/speaker-modal/speaker-modal-footer";
import SpeakerModalBody from "@/app/speakers/speaker-modal/speaker-modal-body";

export default function SpeakerModal() {
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
          // style={{
          //   backgroundColor: "#EEEEEE",
          // }}
        >
          <SpeakersModalHeader />
          <SpeakerModalBody />
          <SpeakerModalFooter />
        </div>
      </div>
    </div>
  );
}
