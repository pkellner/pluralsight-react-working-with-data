"use client";
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
  modalSpeakerImageUrl: string;
  setModalSpeakerImageUrl: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerEmail: string;
  setModalSpeakerEmail: React.Dispatch<React.SetStateAction<string>>;
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
  modalSpeakerImageUrl: "",
  setModalSpeakerImageUrl: () => {},
  modalSpeakerEmail: "",
  setModalSpeakerEmail: () => {},
});

export const SpeakerModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSpeakerId, setModalSpeakerId] = useState(0);
  const [modalSpeakerFirstName, setModalSpeakerFirstName] = useState("");
  const [modalSpeakerLastName, setModalSpeakerLastName] = useState("");
  const [modalSpeakerImageUrl, setModalSpeakerImageUrl] = useState("");
  const [modalSpeakerEmail, setModalSpeakerEmail] = useState("");

  const value = {
    modalShow,
    setModalShow,
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
