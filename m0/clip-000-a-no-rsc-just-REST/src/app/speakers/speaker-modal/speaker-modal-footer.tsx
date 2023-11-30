"use client";
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import { Speaker } from "@/lib/general-types";

export default function SpeakerModalFooter() {
  const {
    setModalShow,
    modalSpeakerId,
    modalSpeakerFirstName,
    modalSpeakerLastName,
    modalSpeakerCompany, // New addition
    modalSpeakerTwitterHandle, // New addition
    modalUserBioShort, // Changed from modalSpeakerBioShort
  } = useSpeakerModalContext();

  function updateSpeaker(speaker : Speaker) {
    async function update() {
      try {
        const response = await fetch(`/api/speakers/${speaker.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error updating speaker:", error);
        throw error;
      }
    }
    update().then(() => {});
  }


  function createSpeaker(speaker: Speaker) {
    async function create() {
      try {
        const response = await fetch(`/api/speakers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(speaker),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error creating new speaker:", error);
        throw error;
      }
    }
    create().then(() => {});
  }

  return (
    <div className="modal-footer justify-content-center">
      {modalSpeakerId !== 0 && (
        <button
          onClick={() => {
            updateSpeaker({
              id: modalSpeakerId,
              firstName: modalSpeakerFirstName,
              lastName: modalSpeakerLastName,
              company: modalSpeakerCompany,
              twitterHandle: modalSpeakerTwitterHandle,
              userBioShort: modalUserBioShort,
            });
            setModalShow(false);
          }}
          className="float-left btn btn-accent"
        >
          Save
        </button>
      )}

      <button
        className="btn btn-danger"
        onClick={() => setModalShow(false)}
        data-dismiss="modal"
      >
        Discard
      </button>

      {modalSpeakerId === 0 && (
        <button
          className="btn btn-accent"
          onClick={() => {
            createSpeaker({
              firstName: modalSpeakerFirstName,
              lastName: modalSpeakerLastName,
              company: modalSpeakerCompany,
              twitterHandle: modalSpeakerTwitterHandle,
              userBioShort: modalUserBioShort,
            });
            setModalShow(false);
          }}
        >
          Add
        </button>
      )}
    </div>
  );
}
