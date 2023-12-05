import {useSpeakerDataContext} from "@/components/contexts/speaker-data-context";

export default function DeleteSpeakerButton({
  speakerId,
}: {
  speakerId: number;
}) {

  const { deleteSpeaker } = useSpeakerDataContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        const confirmed = confirm(
          "Are you sure you want to delete this speaker?",
        );
        if (confirmed) {
          deleteSpeaker(speakerId,() => {
            // do nothing
          });
        }
      }}
      className="btn btn-danger btn-sm"
    >
      <i className="fa fa-trash"></i>
      {" Delete "}
    </button>
  );
}
