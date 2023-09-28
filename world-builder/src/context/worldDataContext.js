import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    loading: false,
    history: [],
    host: false,
    gameId: "",
    clientRef: null,
    currentPlayersInGame: 0,
    caveCords: [],
    buildingCords: [],
    setWorldData: () => {},
    setAuthentication: () => {},
    setHistory: () => {},
    setHost: ()=>{},
    setGameId: ()=>{},
    setClientRef: ()=>{},
    sendMessage: ()=>{},
    setCurrentPlayersInGame: ()=>{},
    setCaveCords: ()=>{},
    setBuildingCords: ()=>{},
});