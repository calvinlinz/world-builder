import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';

function App() {
  const [worldData, setWorldData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/world")
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <ul>
        {Array.isArray(worldData) ? (
          worldData.map((item) => <li key={item.id}>{item.name}</li>)
        ) : (
          <li key={worldData.id}>{worldData.name}</li>
        )}
      </ul>

      <BackgroundGrid/>
      <Grid/>
    </div>
  );
}

export default App;
