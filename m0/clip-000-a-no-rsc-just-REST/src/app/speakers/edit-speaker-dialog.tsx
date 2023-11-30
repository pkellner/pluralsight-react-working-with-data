import { useContext } from "react";
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";

export default function EditSpeakerDialog({
  id,
  firstName,
  lastName,
  company,
  twitterHandle,
  userBioShort,
}: {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  twitterHandle: string;
  userBioShort: string;
}) {
  const {
    setModalShow,
    setModalSpeakerId,
    setModalSpeakerFirstName,
    setModalSpeakerLastName,
    setModalSpeakerCompany,
    setModalSpeakerTwitterHandle,
    setModalUserBioShort,
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
