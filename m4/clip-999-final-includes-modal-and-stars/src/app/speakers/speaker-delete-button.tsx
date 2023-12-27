import { useState } from "react";
import {useSpeakerDataContext} from "@/contexts/speaker-data-context";

export default function SpeakerDeleteButton({
  speakerId,
}: {
  speakerId: number;
}) {
  const { deleteSpeaker } = useSpeakerDataContext();

  const [deleting, setDeleting] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setDeleting(true);
        const confirmed = confirm(
          "Are you sure you want to delete this speaker?",
        );
        if (confirmed) {
          deleteSpeaker(speakerId, () => {
            setDeleting(false);
          });
        }
      }}
      className="btn btn-danger btn-sm"
    >
      <i className="fa fa-trash"></i>
      {deleting ? " Deleting..." : " Delete"}
    </button>
  );
}
