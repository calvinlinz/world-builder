import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const [opacityValue, setOpacity] = useState(1);
  const [opacityCaveValue, setOpacityCaveValue] = useState(1);

  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || []);

  const setWorld = (world) =>{
    const baseSize = 27;
    const mapSizeFactor = (world.length/2)/baseSize;
    document.documentElement.style.setProperty("--map_size_factor", mapSizeFactor);
    setWorldData(world);
  }

  const handleHistory = (world) => {
    const newHistory = history;
    if(newHistory.length === 20){
      newHistory.pop();
    }
    newHistory.unshift(world);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(history));
  }

  useEffect(() => {
    setLoading(true);
    fetch(API_URL + "/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        size: 27,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setWorldData(data);
        setLoading(false);
        handleHistory(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <WorldDataContext.Provider
      value={{
        worldData: worldData,
        opacityValue,
        history,
        opacityCaveValue,
        setWorldData: (worldData, loading) => {
          setWorld(worldData);
          setLoading(loading);
        },
        setOpacityValue: () => {
          setOpacity(opacityValue === 1 ? 0 : 1);
        },
        setHistory: (data) => {
          handleHistory(data);
        },
        setOpacityCaveValue: () => {
          setOpacityCaveValue(opacityCaveValue === 1 ? 0 : 1);
        }
      }}
    >
      <div className="App">
        {gameStarted ? (
          <Display
            worldData={worldData}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <HomePage startGame={() => setGameStarted(true)} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
