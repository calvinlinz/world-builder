import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Grid from './Grid';
import ConfigDropdown from './components/configuration/Configuration.js'


function App() {
  const [worldData, setWorldData] = useState([]);
  const handleSelect = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
  };

  const configOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];


  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:8080/world")
      .then((response) => response.json())
      .then((data) => setWorldData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <ConfigDropdown/>
      <Grid />
    </div>
  );
}

export default App;
