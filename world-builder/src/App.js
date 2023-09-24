import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";


function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080"
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);


  const setWorld = (world) =>{
    const baseSize = 27;
    const mapSizeFactor = (world.length/2)/baseSize;
    document.documentElement.style.setProperty("--map_size_factor", mapSizeFactor);
    setWorldData(world);
  }

  useEffect(() => {
    setLoading(true);
    fetch(API_URL+"/world", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        size:27
      })
    }).then((response)=>response.json())
    .then((data)=>{setWorldData(data);setLoading(false)})
    .catch((error)=>console.log(error));
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <WorldDataContext.Provider value={{
      worldData: worldData,
      setWorldData: (worldData, loading) => {
        setWorld(worldData);
        setLoading(loading);
      },
    }}
  >
      <div className="App">
        {gameStarted ? (
          <Display worldData={worldData} loading={loading} setLoading={setLoading}/>
        ) : (
          <HomePage startGame={startGame} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
