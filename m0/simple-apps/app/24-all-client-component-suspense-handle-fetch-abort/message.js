"use client";

import {use, useState} from "react";

export default function Message({ messagePromise }) {

  const messageContent = use(messagePromise);
  const { id, firstName, lastName, email, created } = messageContent;

  return (
    <div>
      {id}
    </div>
  );

}

const Popup = ({ children, popupContent }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="position-relative d-inline-block">
      <div
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        {children}
      </div>
      {showPopup && (
        <div
          className="card position-absolute"
          style={{
            top: "150%",
            left: "70%",
            transform: "translateX(-50%)",
            zIndex: "1060",
            backgroundColor: "lightblue",
          }}
        >
          <div className="card-body">{popupContent}</div>
        </div>
      )}
    </div>
  );
};
