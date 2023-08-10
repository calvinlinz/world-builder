import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import Display from './Display';

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
      {gameStarted ? ( <Display worldData={worldData} /> ) : ( <HomePage startGame={startGame} /> )}
    </div>
  );
}

export default App;
