'use client';import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const rooms = ["Unassigned", "Ballroom", "Garden", "Pavilion", "Terrace"];

function App() {
  const [currentRoom, setCurrentRoom] = useState(rooms[0]); // Default to the first room

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDrop = (e, room) => {
    e.preventDefault();
    const speakerId = e.dataTransfer.getData("text");
    const speaker = document.getElementById(speakerId);
    speaker.style.opacity = "1"; // Reset the opacity if you changed it during drag
    setCurrentRoom(room);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  return (
    <div className="container">
      <div className="row">
        {rooms.map(room => (
          <div
            key={room}
            className="col text-center"
            onDrop={(e) => handleDrop(e, room)}
            onDragOver={handleDragOver}
          >
            <h5>{room}</h5>
            {currentRoom === room && (
              <div
                id="speaker"
                draggable="true"
                onDragStart={handleDragStart}
                className="p-2 bg-primary text-white"
                style={{ cursor: 'move' }}
              >
                Speaker
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
