'use client'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const rooms = ["Unassigned", "Ballroom", "Garden", "Terrace"];

function App() {
  const [currentRoom, setCurrentRoom] = useState(rooms[0]); // Default to the first room

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.style.opacity = '0.4'; // Visual cue that drag is starting
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'; // Reset the opacity when drag ends
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
            className="col-3 text-center p-1" // Reduced padding for more space
            onDrop={(e) => handleDrop(e, room)}
            onDragOver={handleDragOver}
            style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: currentRoom === room ? 'blue' : '#ccc' }}
          >
            <h5 style={{ fontSize: '0.75rem' }}>{room}</h5> {/* Smaller font size for headings */}
            {currentRoom === room && (
              <div
                id="speakerCard"
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="card mx-auto"
                style={{ maxWidth: '150px', cursor: 'move', padding: '5px' }} // Reduced padding inside the card
              >
                <img src="/images/speaker-1124.jpg" className="card-img-top" alt="Douglas Crockford" />
                <div className="card-body p-1"> {/* Reduced padding inside the card-body */}
                  <h5 className="card-title" style={{ fontSize: '0.65rem' }}>Douglas Crockford</h5> {/* Even smaller font size for card titles */}
                  <p className="card-text" style={{ fontSize: '0.6rem' }}>Discovered JSON</p> {/* Small font size for card text */}
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
