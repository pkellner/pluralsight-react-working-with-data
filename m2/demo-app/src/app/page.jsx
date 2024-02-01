'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const rooms = ["Unassigned", "Ballroom", "Garden", "Terrace"];

function App() {
  const [currentRoom, setCurrentRoom] = useState(rooms[0]); // Default to the first room

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDrop = (e, room) => {
    e.preventDefault();
    const speakerId = e.dataTransfer.getData("text");
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
                id="speakerCard"
                draggable="true"
                onDragStart={handleDragStart}
                className="card"
                style={{ width: '8', cursor: 'move' }}
              >
                <img src="/images/speaker-1124.jpg" className="card-img-top" alt="Douglas Crockfod"   />
                <div className="card-body">
                  <h5 className="card-title">Douglas Crockford</h5>
                  <p className="card-text">Douglas Crockford discovered the JSON Data Interchange Format.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
