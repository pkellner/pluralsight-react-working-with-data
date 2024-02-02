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
  modalSpeakerCompany: string;
  setModalSpeakerCompany: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerTwitterHandle: string;
  setModalSpeakerTwitterHandle: React.Dispatch<React.SetStateAction<string>>;
  modalUserBioShort: string;
  setModalUserBioShort: React.Dispatch<React.SetStateAction<string>>;
  modalSpeakerTimeSpeaking: Date;
  setModalSpeakerTimeSpeaking: React.Dispatch<React.SetStateAction<Date>>;
  modalSpeakerFavorite: boolean;
  setModalSpeakerFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpeakerModalContext = createContext<SpeakerModalContextProps | undefined>(
  undefined,
);

export const SpeakerModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalSpeakerId, setModalSpeakerId] = useState(0);
  const [modalSpeakerFirstName, setModalSpeakerFirstName] = useState("");
  const [modalSpeakerLastName, setModalSpeakerLastName] = useState("");
  const [modalSpeakerCompany, setModalSpeakerCompany] = useState("");
  const [modalSpeakerTwitterHandle, setModalSpeakerTwitterHandle] =
    useState("");
  const [modalUserBioShort, setModalUserBioShort] = useState("");
  const [modalSpeakerTimeSpeaking, setModalSpeakerTimeSpeaking] =
    useState<Date>(new Date());
  const [modalSpeakerFavorite, setModalSpeakerFavorite] = useState(false);

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
    modalSpeakerTimeSpeaking,
    setModalSpeakerTimeSpeaking,
    modalSpeakerFavorite,
    setModalSpeakerFavorite,
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
