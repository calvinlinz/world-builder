import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";
import SockJsClient from "react-stomp";
import client from "react-stomp";

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

  const [opacityRoofValue, setOpacityRoofValue] = useState(1);
  const [opacityCaveValue, setOpacityCaveValue] = useState(1);
  const [host, setHost] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState("test");
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
        opacityRoofValue,
        history,
        opacityCaveValue,
        host,
        gameId,
        clientRef: clientRef,
        setWorldData: (worldData, loading) => {
          setWorld(worldData);
          setLoading(loading);
        },
        setOpacityRoofValue: (bool) => {
          setOpacityRoofValue(bool? 1 : 0);
        },
        setHistory: (data) => {
          handleHistory(data);
        },
        setOpacityCaveValue: (bool) => {
          setOpacityCaveValue(bool? 1 : 0);
        },
        setHost: (host) => {
          setHost(host);
        },
        setGameId: (gameId) => {
          setGameId(gameId);
        },
        sendMessage: (data, roofs , caves) => {
          clientRef.current.sendMessage(
            "/app/send/" + gameId,
            JSON.stringify({
              id:0,
              world: JSON.stringify(data),
              roofs: roofs,
              caves: caves
            })
          );
        }
      }}
    >
      <div className="App">
        {gameStarted ? (
          <>
            <SockJsClient
              url= {API_URL + "/game/"}
              topics={["/session/" + gameId]}
              onConnect={() => {
                console.log("connected: " + gameId);
              }}
              onDisconnect={() => {
                console.log("Disconnected");
              }}
              onMessage={(msg) => {
                setWorldData(JSON.parse(msg.world));
                setOpacityRoofValue(msg.roofs ? 1 : 0);
                setOpacityCaveValue(msg.caves ? 1 : 0);
              }}
              ref={(client) => {
                clientRef.current = client;
              }}
            />
            <Display
              worldData={worldData}
              loading={loading}
              setLoading={setLoading}
              clientRef={clientRef}
            />
          </>
        ) : (
          <HomePage startGame={() => setGameStarted(true)} setHost={setHost} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
