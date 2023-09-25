import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    loading: false,
    opacityValue: 1,
    history: [],
    opacityCaveValue: 1,
    setAuthentication: () => {},
    setOpacityValue: () => {},
    setHistory: () => {},
    setOpacityCaveValue: () => {}
});