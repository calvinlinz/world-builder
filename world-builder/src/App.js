import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";
import SockJsClient from "react-stomp";
import client from "react-stomp";

function App() {
  const [opacityValue, setOpacity] = useState(1);
  const [opacityCaveValue, setOpacityCaveValue] = useState(1);
  const [host, setHost] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const clientRef = useRef();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const setWorld = (world) => {
    const baseSize = 27;
    const mapSizeFactor = world.length / 2 / baseSize;
    document.documentElement.style.setProperty(
      "--map_size_factor",
      mapSizeFactor
    );
    setWorldData(world);
  };

  const handleHistory = (world) => {
    const newHistory = history;
    if (newHistory.length === 20) {
      newHistory.pop();
    }
    newHistory.unshift(world);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(history));
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <WorldDataContext.Provider
      value={{
        worldData: worldData,
        opacityValue,
        history,
        opacityCaveValue,
        host,
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
        },
        setHost: (host) => {
          setHost(host);
        },
      }}
    >
      <div className="App">
        <SockJsClient
          url="http://localhost:8080/game/"
          topics={["/topic/user"]}
          onConnect={() => {
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(msg) => {
            console.log(msg);
          }}
          ref={(client) => {
            clientRef.current = client;
          }}
        />
        {gameStarted ? (
          <Display
            worldData={worldData}
            loading={loading}
            setLoading={setLoading}
            clientRef={clientRef}
          />
        ) : (
          <HomePage startGame={() => setGameStarted(true)} setHost={setHost} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
