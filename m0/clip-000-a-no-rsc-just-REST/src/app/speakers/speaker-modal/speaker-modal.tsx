import React from "react";

import SpeakersModalHeader from "./speaker-modal-header";
import {useSpeakerModalContext} from "@/components/contexts/speaker-modal-context";
import SpeakerModalFooter from "@/app/speakers/speaker-modal/speaker-modal-footer";
import SpeakerModalBody from "@/app/speakers/speaker-modal/speaker-modal-body";



export default function SpeakerModal() {
  const { modalShow } = useSpeakerModalContext();

  const cssShowHide =
    modalShow && modalShow
      ? "modal show-modal has-backdrop"
      : "modal hide-modal";

  return (
    <>
      <style jsx>
        {`
          .show-modal {
            display: block;
          }

          .has-backdrop:before {
            content: "";
            background: rgb(24 26 29 / 77%);
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            margin: 0;
            backdrop-filter: blur(5px);
          }

          .hide-modal {
            display: none;
          }
        `}
      </style>
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
            <SpeakerModalFooter />
          </div>
        </div>
      </div>
    </>
  );
}
