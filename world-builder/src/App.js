import React, { useEffect, useState } from 'react';
import Display from './Display'; // Import the Display component
import Grid from './Grid';

function App() {
  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/world")
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? ( 
        <>
          <Display worldData={worldData} />
          <Grid />
        </>
      ) : (
        <div className="homepage">
        <header className="hero">
            <h1>Dungeons & Dragons Map Generator</h1>
            <p><b>Embark on an exciting journey as a Dungeon Master.</b></p>
            <button onClick={startGame}>Generate Map</button>
        </header>
      </div>
      )}
    </div>
  );
}

export default App;

