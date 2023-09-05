import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./HomePage";
import Display from "./Display";
import Configuration from "./components/configuration/Configuration";
import Grid from "./Grid";
import BackgroundGrid from "./BackgroundGrid";
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";

function App() {
  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch the data from your backend endpoint
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
        <Display worldData={worldData} />
      ) : (
        <HomePage startGame={startGame} />
      )}
      <Configuration worldData={worldData} />
    </div>
  );
}

export default App;
