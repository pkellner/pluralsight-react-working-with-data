import React, { useState, useEffect } from "react";
import SpeakerDetailLoading from "./speaker-detail-loading";
import SpeakerDetail from "./speaker-detail";

export default function SpeakerList() {
  const [loading, setLoading] = useState(true);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/speakers");
        const data = await response.json();
        setSpeakers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-3">
        <div className="row">
          {[1,2,3].map((id) => (
            <SpeakerDetailLoading key={id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {speakers.map((speaker) => (
          <SpeakerDetail speaker={speaker} key={speaker.id} />
        ))}
      </div>
    </div>
  );
}
