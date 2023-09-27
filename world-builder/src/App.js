import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";
import SockJsClient from "react-stomp";

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://10.140.45.67:8080";
  const [opacityRoofValue, setOpacityRoofValue] = useState(1);
  const [opacityCaveValue, setOpacityCaveValue] = useState(1);
  const [id,setId] = useState(null);
  const [host, setHost] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState("test");
  const [currentPlayersInGame,setCurrentPlayersInGame] = useState(1);
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


  const handleTabClose = () => {
    clientRef.current.disconnect();
  }
  
  useEffect(() => {
    setLoading(true);
    window.addEventListener('beforeunload', handleTabClose);
    return () =>{
      window.removeEventListener('beforeunload', handleTabClose);
    }
  }, [clientRef.current]);

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
        currentPlayersInGame,
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
        sendMessage: (data,roofs,caves) => {
          clientRef.current.sendMessage(
            "/app/send/" + gameId,
            JSON.stringify({
              id:id,
              world: JSON.stringify(data),
              roofs: roofs,
              caves: caves,
              players: currentPlayersInGame,
            })
          );
        },
        setCurrentPlayersInGame: (num) => {
          setCurrentPlayersInGame(num);
        }
      }}
    >
      <div className="App">
        {gameStarted ? (
          <>
            <SockJsClient
              url={API_URL +"/game/"}
              topics={["/session/" + gameId]}
              onConnect={() => {
                const options = {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ gameId: gameId, host: host }),
                };
                fetch(API_URL + "/game/join", options)
                  .then((response) => response.json())
                  .then((data) => {setId(data.id)});
              }}
              onDisconnect={() => {
                const options = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: id}),
                };
                fetch(API_URL + "/game/leave", options).then((response) => {
                  const newCurrentPlayersInGame = currentPlayersInGame - 1;
                  clientRef.current.sendMessage(
                    "/app/send/" + gameId,
                    JSON.stringify({
                      id:id,
                      world: JSON.stringify(worldData),
                      roofs: opacityRoofValue === 1 ? true : false,
                      caves:  opacityCaveValue === 1 ? true : false,
                      players: newCurrentPlayersInGame,
                    })
                  );
                });
              }}
              onMessage={(msg) => {
                setWorld(JSON.parse(msg.world));
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
          <HomePage startGame={() => setGameStarted(true)} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
