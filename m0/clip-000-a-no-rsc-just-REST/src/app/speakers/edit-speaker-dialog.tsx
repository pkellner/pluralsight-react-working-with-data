import {useSpeakerModalContext} from "@/components/contexts/speaker-modal-context";

export default function EditSpeakerDialog({
  id,
  firstName,
  lastName,
  company,
  twitterHandle,
  userBioShort,
  timeSpeaking,
}: {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  twitterHandle: string;
  userBioShort: string;
  timeSpeaking: Date;
}) {
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
        setModalSpeakerCompany(company);
        setModalSpeakerTwitterHandle(twitterHandle);
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
