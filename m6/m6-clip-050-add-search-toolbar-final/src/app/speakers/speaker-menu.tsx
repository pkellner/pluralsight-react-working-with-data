"use client";
import React from "react";
import { useSpeakerMenuContext } from "@/contexts/speaker-menu-context";

export default function SpeakerMenu() {
  const { searchText, setSearchText } = useSpeakerMenuContext();

  return (
    <div
      className="btn-toolbar"
      role="toolbar"
      aria-label="Speaker toolbar filter"
    >
      <div className="toolbar-trigger mb-3 p-1">
        <div className="toolbar-search">
          <input
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}
