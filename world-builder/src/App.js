import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";
import SockJsClient from "react-stomp";
import { ToastContainer, toast } from "react-toastify";
import { set } from "lodash";

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const [id, setId] = useState(null);
  const [host, setHost] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState("test");
  const [currentPlayersInGame, setCurrentPlayersInGame] = useState(0);
  const [roofOpacity, setRoofOpacity] = useState(1);
  const [caveOpacity, setCaveOpacity] = useState(1);
  const [frameValue, setFrameState] = useState(true);
  const currentScrollX = useRef(0);
  const currentScrollY = useRef(0);
  const [caveCords, setCaveCords] = useState([]);
  const [buildingCords, setBuildingCords] = useState([]);

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
    for (var i = 0; i < history.length; i++) {
      //iterate through each object in an array
      if (JSON.stringify(history[i]) === JSON.stringify(world)) {
        return;
      }
    }
    const newHistory = history;

    if (newHistory.length === 20) {
      newHistory.pop();
    }
    newHistory.unshift(world);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(history));
  };

  const handleTabClose = () => {
    try {
      clientRef.current.disconnect();
    } catch (error) {
      console.log(error);
    }
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyInfo = (message) => toast.success(message);

  useEffect(() => {
    if (gameStarted) {
      notifySuccess((host ? "Created " : "Joined ") + "Game " + gameId);
    }
  }, [gameStarted]);
  useEffect(() => {
    setLoading(true);
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [clientRef.current]);

  return (
    <WorldDataContext.Provider
      value={{
        worldData: worldData,
        history,
        host,
        gameId,
        clientRef: clientRef,
        currentPlayersInGame,
        caveCords,
        buildingCords,
        roofOpacity: roofOpacity,
        caveOpacity: caveOpacity,
        frameValue,
        setWorldData: (worldData, loading) => {
          setWorld(worldData);
          setLoading(loading);
        },
        setHistory: (data) => {
          handleHistory(data);
        },
        setHost: (host) => {
          setHost(host);
        },
        setGameId: (gameId) => {
          setGameId(gameId);
        },
        setRoofOpacity: (opacity) => {
          setRoofOpacity(opacity);
        },
        setCaveOpacity: (opacity) => {
          setCaveOpacity(opacity);
        },
        setFrameState: (frameValue) => {
          setFrameState(frameValue);
        },
        sendMessage: (
          worldData,
          buildingCords,
          caveCords,
          currentPlayersInGame,
          currentScrollX,
          currentScrollY
        ) => {
          clientRef.current.sendMessage(
            "/app/send/" + gameId,
            JSON.stringify({
              id: id,
              world: JSON.stringify(worldData),
              roofs: JSON.stringify(buildingCords),
              caves: JSON.stringify(caveCords),
              players: currentPlayersInGame,
              x: currentScrollX,
              y: currentScrollY,
            })
          );
        },
        setCurrentPlayersInGame: (num) => {
          setCurrentPlayersInGame(num);
        },
        setCaveCords: (cords) => {
          setCaveCords(cords);
        },
        setBuildingCords: (cords) => {
          setBuildingCords(cords);
        },
      }}
    >
      <div className="App">
        <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="dark"
          toastStyle={{ backgroundColor: "#1f1f1f" }}
        />
        {gameStarted ? (
          <>
            <SockJsClient
              url={API_URL + "/game/"}
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
                  .then((data) => {
                    setId(data.id);
                    setCurrentPlayersInGame(data.players);
                  });
              }}
              onDisconnect={() => {
                const options = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: id,
                    worldData: JSON.stringify(worldData),
                    x: currentScrollX.current,
                    y: currentScrollY.current,
                    roofs: JSON.stringify(buildingCords),
                    caves: JSON.stringify(caveCords),
                  }),
                };
                fetch(API_URL + "/game/leave", options);
              }}
              onMessage={(msg) => {
                const previousPlayers = currentPlayersInGame;
                if (!host) {
                  if (msg.id != -1) {
                    if (
                      msg.caves == null ||
                      msg.roofs == null ||
                      msg.world == null
                    ) {
                      return;
                    }
                    if (msg.world != JSON.stringify(worldData)) {
                      setWorld(JSON.parse(msg.world));
                    }
                    if (msg.roofs != JSON.stringify(buildingCords)) {
                      const roofs = JSON.parse(msg.roofs);
                      setBuildingCords(roofs);
                    }
                    if (msg.caves != JSON.stringify(caveCords)) {
                      const caves = JSON.parse(msg.caves);
                      setCaveCords(caves);
                    }
                    window.scroll(msg.x, msg.y);
                  }
                }
                if (
                  msg.id == -1 &&
                  previousPlayers != msg.players &&
                  previousPlayers != 0 &&
                  msg.join
                ) {
                  notifyInfo("A player has joined the game");
                }

                setCurrentPlayersInGame(msg.players);
              }}
              ref={(client) => {
                clientRef.current = client;
              }}
            />
            <Display
              currentScrollX={currentScrollX}
              currentScrollY={currentScrollY}
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
