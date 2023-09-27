import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    loading: false,
    opacityValue: 1,
    history: [],
    opacityCaveValue: 1,
    host: false,
    setAuthentication: () => {},
    setOpacityValue: () => {},
    setHistory: () => {},
    setOpacityCaveValue: () => {},
    setHost: ()=>{}
});