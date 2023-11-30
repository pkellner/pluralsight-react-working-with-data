import React, { createContext, ReactNode, useState } from "react";

interface SpeakerModalContextProps {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  modalSpeakerId: number;
  setModalSpeakerId: React.Dispatch<React.SetStateAction<number>>;
  modalSpeakerFirstName: string;
  setModalSpeakerFirstName: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerLastName: string;
  setModalSpeakerLastName: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerCompany: string;
  setModalSpeakerCompany: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerTwitterHandle: string;
  setModalSpeakerTwitterHandle: React.Dispatch<React.SetStateAction<string>>;
  modalUserBioShort: string; // Changed from modalSpeakerBioShort
  setModalUserBioShort: React.Dispatch<React.SetStateAction<string>>; // Changed from setModalSpeakerBioShort
}

const SpeakerModalContext = createContext<SpeakerModalContextProps>({
  modalShow: false,
  setModalShow: () => {},
  modalSpeakerId: 0,
  setModalSpeakerId: () => {},
  modalSpeakerFirstName: "",
  setModalSpeakerFirstName: () => {},
  modalSpeakerLastName: "",
  setModalSpeakerLastName: () => {},
  modalSpeakerCompany: "",
  setModalSpeakerCompany: () => {},
  modalSpeakerTwitterHandle: "",
  setModalSpeakerTwitterHandle: () => {},
  modalUserBioShort: "",
  setModalUserBioShort: () => {},
});

export const SpeakerModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSpeakerId, setModalSpeakerId] = useState(0);
  const [modalSpeakerFirstName, setModalSpeakerFirstName] = useState("");
  const [modalSpeakerLastName, setModalSpeakerLastName] = useState("");
  const [modalSpeakerCompany, setModalSpeakerCompany] = useState("");
  const [modalSpeakerTwitterHandle, setModalSpeakerTwitterHandle] =
    useState("");
  const [modalUserBioShort, setModalUserBioShort] = useState("");

  const value = {
    modalShow,
    setModalShow,
    modalSpeakerId,
    setModalSpeakerId,
    modalSpeakerFirstName,
    setModalSpeakerFirstName,
    modalSpeakerLastName,
    setModalSpeakerLastName,
    modalSpeakerCompany,
    setModalSpeakerCompany,
    modalSpeakerTwitterHandle,
    setModalSpeakerTwitterHandle,
    modalUserBioShort,
    setModalUserBioShort,
  };

  return (
    <SpeakerModalContext.Provider value={value}>
      {children}
    </SpeakerModalContext.Provider>
  );
};

export function useSpeakerModalContext() {
  const context = React.useContext(SpeakerModalContext);
  if (!context) {
    throw new Error(
      "useSpeakerModalContext must be used within a SpeakerModalProvider",
    );
  }
  return context;
}
