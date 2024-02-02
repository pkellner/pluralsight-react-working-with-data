"use client";
import React, { useState, useEffect } from "react";
import SpeakerDetail from "./speaker-detail";


function Speakers() {
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState();
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
    return <div className="container mt-3">Loading...</div>;
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

export default Speakers;
