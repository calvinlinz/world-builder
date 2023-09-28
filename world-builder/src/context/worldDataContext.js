import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    loading: false,
    opacityRoofValue: 1,
    history: [],
    opacityCaveValue: 1,
    host: false,
    gameId: "",
    clientRef: null,
    currentPlayersInGame: 0,
    frameValue: true,
    setWorldData: () => { },
    setAuthentication: () => { },
    setOpacityRoofValue: () => { },
    setHistory: () => { },
    setOpacityCaveValue: () => { },
    setHost: () => { },
    setGameId: () => { },
    setClientRef: () => { },
    sendMessage: () => { },
    setCurrentPlayersInGame: () => { },
    setFrameState: () => { }
});