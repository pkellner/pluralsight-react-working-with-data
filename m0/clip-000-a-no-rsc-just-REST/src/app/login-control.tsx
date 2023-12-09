import React, { useState, useEffect } from "react";
import { useLocalAuthContext } from "@/components/contexts/auth-context";
import { useSpeakerDataContext } from "@/components/contexts/speaker-data-context";

export default function LoginControl() {
  const { isLoggedIn, setLoggedInName, isLoading, loggedInFirstLast } =
    useLocalAuthContext();

  const { speakerList, setSpeakerList } = useSpeakerDataContext();

  return (
    <span className="p-2">
      {!isLoading ? (
        isLoggedIn ? (
          <div>
            <span className="p-1">
              Logged in as <i>{loggedInFirstLast}</i>
            </span>
            <span
              className="mt-2"
              onClick={() => {
                setLoggedInName("");
                setSpeakerList(
                  speakerList.map((speaker) => ({
                    ...speaker,
                    favorite: false,
                  })),
                );
              }}
            >
              <b>Logout</b>
            </span>
          </div>
        ) : (
          <div>
            <a className="mt-2" href="/attendees">
              Sign-in
            </a>
          </div>
        )
      ) : null}
    </span>
  );
}
