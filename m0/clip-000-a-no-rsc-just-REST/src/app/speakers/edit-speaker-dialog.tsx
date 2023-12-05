import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";
import { Speaker } from "@/lib/general-types";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function EditSpeakerDialog({
  speakerId,
}: {
  speakerId: number;
}) {
  const { speakerList } = useSpeakerDataContext();

  console.log("edit-speaker-dialog: speakerId", speakerId);

  const speakerRec: Speaker =
    speakerList.find((speaker) => speaker.id === speakerId) ?? ({} as Speaker); // this should always be a real speaker

  if (!speakerRec) {
    console.error("edit-speaker-dialog: speakerRec is undefined");
    return null;
  }

  if (speakerRec.timeSpeaking === undefined) {
    console.error("edit-speaker-dialog: speakerRec.timeSpeaking is undefined");
    return null;
  }

  console.log("edit-speaker-dialog: speakerRec", speakerRec);

  const {
    id,
    firstName,
    lastName,
    company,
    twitterHandle,
    userBioShort,
    timeSpeaking,
  } = speakerRec;

  // console.log(
  //   "edit-speaker-dialog: speakerRec",
  //   speakerRec,
  //   "id",
  //   id,
  //   "firstName",
  //   firstName,
  //   "lastName",
  //   lastName,
  //   "company",
  //   company,
  //   "twitterHandle",
  //   twitterHandle,
  //   "userBioShort",
  //   userBioShort,
  //   "timeSpeaking",
  //   timeSpeaking,
  // );

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
        setModalShow(true);
      }}
      className="btn btn-accent btn-sm"
    >
      <i className="fa fa-edit"></i>
      {" Edit "}
    </button>
  );
}
