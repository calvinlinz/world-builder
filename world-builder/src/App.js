import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import Display from './Display';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";


function App() {
  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    document.title = "D&D Map Generator";
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
      {gameStarted ? (<Display worldData={worldData} />) : (<HomePage startGame={startGame} />)}
      <ul>
        {Array.isArray(worldData) ? (
          worldData.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li key={worldData.id}>{worldData.name}</li>
        )}
      </ul>

      <BackgroundGrid/>
      <BuildingsGrid/>
      <NaturalFeaturesGrid/>

    </div>
  );
}

export default App;