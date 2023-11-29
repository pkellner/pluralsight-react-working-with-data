"use client";
import { useContext } from "react";
import { useSpeakerModalContext } from "@/components/contexts/speaker-modal-context";

export default function EditSpeakerDialog({
  id,
  firstName,
  lastName,
  email,
  imageUrl,
}: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}) {
  const {
    setModalShow,
    modalShow,
    modalSpeakerId,
    setModalSpeakerId,
    modalSpeakerFirstName,
    setModalSpeakerFirstName,
    modalSpeakerLastName,
    setModalSpeakerLastName,
    modalSpeakerEmail,
    setModalSpeakerEmail,
    modalSpeakerImageUrl,
    setModalSpeakerImageUrl,
  } = useSpeakerModalContext();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setModalSpeakerId(id);
        setModalSpeakerFirstName(firstName);
        setModalSpeakerLastName(lastName);
        setModalSpeakerImageUrl(imageUrl);
        setModalSpeakerEmail(email);
        setModalShow(true);
      }}
      className="btn btn-accent btn-sm"
    >
      <i className="fa fa-edit"></i>
      {" Edit "}
    </button>
  );
}
