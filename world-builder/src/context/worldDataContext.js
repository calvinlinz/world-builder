import { createContext } from "react";

export const WorldDataContext = createContext({
    worldData: [],
    setAuthentication: () => {},
});