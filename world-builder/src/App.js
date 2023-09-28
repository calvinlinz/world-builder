import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { WorldDataContext } from "./context/worldDataContext";
import SockJsClient from "react-stomp";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const [opacityRoofValue, setOpacityRoofValue] = useState(1);
  const [opacityCaveValue, setOpacityCaveValue] = useState(1);
  const [id, setId] = useState(null);
  const [host, setHost] = useState(false);
  const [worldData, setWorldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameId, setGameId] = useState("test");
  const [currentPlayersInGame, setCurrentPlayersInGame] = useState(0);
  const currentScrollX = useRef(0);
  const currentScrollY = useRef(0);

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
    try {
      clientRef.current.disconnect();
    } catch (error) {
      console.log(error);
    }
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyInfo = (message) => toast.success(message);


  useEffect(()=>{
    if(gameStarted){
      notifySuccess((host ? "Created " : "Joined ") + "Game " + gameId);
    }

  },[gameStarted]);
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
          setOpacityRoofValue(bool ? 1 : 0);
        },
        setHistory: (data) => {
          handleHistory(data);
        },
        setOpacityCaveValue: (bool) => {
          setOpacityCaveValue(bool ? 1 : 0);
        },
        setHost: (host) => {
          setHost(host);
        },
        setGameId: (gameId) => {
          setGameId(gameId);
        },
        sendMessage: (
          worldData,
          opacityRoofValue,
          opacityCaveValue,
          currentPlayersInGame,
          currentScrollX,
          currentScrollY
        ) => {
          clientRef.current.sendMessage(
            "/app/send/" + gameId,
            JSON.stringify({
              id: id,
              world: JSON.stringify(worldData),
              roofs: opacityRoofValue === 1 ? true : false,
              caves: opacityCaveValue === 1 ? true : false,
              players: currentPlayersInGame,
              x: currentScrollX,
              y: currentScrollY,
            })
          );
        },
        setCurrentPlayersInGame: (num) => {
          setCurrentPlayersInGame(num);
        },
      }}
    >
      <div className="App">
      <ToastContainer autoClose={2000}  position="top-center" theme="dark" toastStyle={{backgroundColor:"#1f1f1f"}}/>
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
                    roofs: opacityRoofValue === 1 ? true : false,
                    caves: opacityCaveValue === 1 ? true : false
                  }),
                };
                fetch(API_URL + "/game/leave", options);
              }}
              onMessage={(msg) => {
                const previousPlayers = currentPlayersInGame;
                console.log(msg);
                if (!host) {
                  if(msg.id !=-1){
                    if(msg.world != JSON.stringify(worldData)){
                      setWorld(JSON.parse(msg.world));
                    }
                    if((msg.roofs ? 1 : 0) != opacityRoofValue) {
                      setOpacityRoofValue(msg.roofs ? 1 : 0);
                    }
                    if((msg.caves ? 1 : 0) != opacityCaveValue){
                      setOpacityCaveValue(msg.caves ? 1 : 0);
                    }
                    window.scroll(msg.x, msg.y);
                  }
                }
                if(msg.id == -1 && (previousPlayers != msg.players && previousPlayers!=0) && msg.join){
                  notifyInfo("A player has joined the game");
                }
                if(msg.id == -1 && (previousPlayers != msg.players && previousPlayers!=0) && !msg.join){
                  notifyInfo("A player has left the game");
                }
                setCurrentPlayersInGame(msg.players);
              }}
              ref={(client) => {
                clientRef.current = client;
              }}
            />
            <Display
              currentScrollX = {currentScrollX}
              currentScrollY = {currentScrollY}
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
