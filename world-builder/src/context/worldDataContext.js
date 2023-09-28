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
    roofOpacity: 1,
    caveOpacity: 1,
    frameValue: true,
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
    setRoofOpacity: ()=>{},
    setCaveOpacity: ()=>{},
    setFrameState: () => { }

});