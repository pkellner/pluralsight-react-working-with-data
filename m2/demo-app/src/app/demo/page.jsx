"use client";
import React, { useState, useEffect } from "react";

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

  async function toggleFavorite(id) {
    const speakerIndex = speakers.findIndex((speaker) => speaker.id === id);
    const speaker = speakers[speakerIndex];
    const updatedSpeaker = { ...speaker, favorite: !speaker.favorite };

    try {
      setUpdatingId(id);
      const response = await fetch(`http://localhost:3000/api/speakers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpeaker),
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (response.ok) {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[speakerIndex] = updatedSpeaker;
        setSpeakers(updatedSpeakers);
        setUpdatingId(undefined);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  if (loading) {
    return <div className="container mt-3">Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="col-4">
            <div className="card">
              <img
                src={`/images/speaker-${speaker.id}.jpg`}
                alt={`${speaker.firstName} ${speaker.lastName}`}
                className="card-img-top"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {speaker.firstName} {speaker.lastName}
                </h5>
                <ul className="list-unstyled">
                  <li>
                    {updatingId && speaker.id === updatingId  ? (
                      <img src="/images/spinning.gif" width={25} alt={"busy"} />
                    ) : (
                      <img
                        src={`/images/${
                          speaker.favorite ? "heart-red.png" : "heart-dark.png"
                        }`}
                        onClick={() => toggleFavorite(speaker.id)}
                        alt="Favorite"
                      />
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Speakers;
