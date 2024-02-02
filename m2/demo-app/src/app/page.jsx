'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const rooms = ["Unassigned", "Ballroom", "Garden", "Terrace"];

function App() {
  const [currentRoom, setCurrentRoom] = useState(rooms[0]); // Default to the first room
  const [isLoaded, setIsLoaded] = useState(false); // Add this line to track if data has been loaded

  useEffect(() => {
    fetch('/api/assignRoom')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.message) {
          setCurrentRoom(data.message);
          setIsLoaded(true); // Set isLoaded to true once data is successfully fetched
        }
      });
  }, []);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDrop = (e, room) => {
    e.preventDefault();
    const speakerId = e.dataTransfer.getData("text");
    setCurrentRoom(room);

    fetch('/api/assignRoom', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: room }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        {rooms.map(room => (
          <div
            key={room}
            className="col-3 text-center p-1"
            onDrop={(e) => handleDrop(e, room)}
            onDragOver={handleDragOver}
            style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: currentRoom === room ? 'blue' : '#ccc' }}
          >
            <h5 style={{ fontSize: '0.75rem' }}>{room}</h5>
            {currentRoom === room && isLoaded && ( // Conditionally render this based on isLoaded
              <div
                id="speakerCard"
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="card mx-auto"
                style={{ maxWidth: '150px', cursor: 'move', padding: '5px' }}
              >
                <img src="/images/speaker-1124.jpg" className="card-img-top" alt="Douglas Crockford" />
                <div className="card-body p-1">
                  <h5 className="card-title" style={{ fontSize: '0.65rem' }}>Douglas Crockford</h5>
                  <p className="card-text" style={{ fontSize: '0.6rem' }}>Discovered JSON</p>
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
