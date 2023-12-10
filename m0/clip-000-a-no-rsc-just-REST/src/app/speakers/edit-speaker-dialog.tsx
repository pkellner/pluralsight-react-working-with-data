import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function EditSpeakerDialog({
  speakerId,
}: {
  speakerId: number;
}) {
  const { speakerList } = useSpeakerDataContext();

  const speakerRec: Speaker =
    speakerList.find((speaker) => speaker.id === speakerId) ?? ({} as Speaker); // this should always be a real speaker

  const {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
    favorite,
  }: Speaker = speakerRec;

  const {
    setModalShow,
    setModalSpeakerId,
    setModalSpeakerFirstName,
    setModalSpeakerLastName,
    setModalSpeakerCompany,
    setModalSpeakerTwitterHandle,
    setModalUserBioShort,
    setModalSpeakerTimeSpeaking,
    setModalSpeakerFavorite,
  } = useSpeakerModalContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setModalSpeakerId(id);
        setModalSpeakerFirstName(firstName);
        setModalSpeakerLastName(lastName);
        setModalSpeakerCompany(company ?? "");
        setModalSpeakerTwitterHandle(twitterHandle ?? "");
        setModalSpeakerTimeSpeaking(timeSpeaking);
        setModalUserBioShort(userBioShort);
        setModalSpeakerFavorite(favorite ?? false);
        setModalShow(true);
      }}
      className="btn btn-accent btn-sm"
    >
      <i className="fa fa-edit"></i>
      {" Edit "}
    </button>
  );
}
