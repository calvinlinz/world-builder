import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './Grid';

function App() {
  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false); // Step 2

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/world")
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const startGame = () => {
    setGameStarted(true); // Step 3
  };

  return (
    <div className="App">
      {gameStarted ? ( // Step 4
        <>
          <ul>
            {Array.isArray(worldData) ? (
              worldData.map((item) => <li key={item.id}>{item.name}</li>)
            ) : (
              <li key={worldData.id}>{worldData.name}</li>
            )}
          </ul>
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
