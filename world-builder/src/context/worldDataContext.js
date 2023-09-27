import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    loading: false,
    opacityValue: 1,
    history: [],
    opacityCaveValue: 1,
    host: false,
    gameId: "",
    setAuthentication: () => {},
    setOpacityValue: () => {},
    setHistory: () => {},
    setOpacityCaveValue: () => {},
    setHost: ()=>{},
    setGameId: ()=>{}

});