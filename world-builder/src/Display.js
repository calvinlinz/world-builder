import React, { useEffect, useState } from "react";
import ConfigDropdown from "./components/configuration/Configuration";
import MonstersOverlay from "./components/configuration/MonstersOverlay";
import Grid from "./Grid";
import BackgroundGrid from "./BackgroundGrid";
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";
import CaveGrid from "./CaveGrid";
import RoofGrid from "./RoofGrid";
import CampGrid from "./CampGrid";
import PathGrid from "./PathGrid";
import "./Grid.css";
import "./Display.css";
import SideBar from "./components/configuration/Sidebar";
import Loading from "./components/loading/loading"

const Display = ({ worldData, loading }) => {
  const [opacityValue, setOpacity] = useState(1);
  const [scaleFactor, setScaleFactor] = useState(0.25);
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  const toggleOpactiy = () => {
    setOpacity(opacityValue === 1 ? 0 : 1);
  };

  const setScaleFactorImages = (e) => {
    setScaleFactor(e / 10);
    document.documentElement.style.setProperty("--scale-factor", scaleFactor);
    console.log(scaleFactor);
  };

  return (
    <>
      <SideBar opacityToggle={toggleOpactiy} />
      {loading ? (
        <Loading/>
      ) : (
        <>
          <BackgroundGrid worldData={worldData} />
          <PathGrid worldData={worldData} />
          <BuildingsGrid scaleFactor={scaleFactor} worldData={worldData} />
          <NaturalFeaturesGrid
            scaleFactor={scaleFactor}
            worldData={worldData}
          />
          <CaveGrid scaleFactor={scaleFactor} worldData={worldData} />
          <RoofGrid
            opacityValue={opacityValue}
            scaleFactor={scaleFactor}
            worldData={worldData}
          />
          <CampGrid scaleFactor={scaleFactor} worldData={worldData} />
          <div className="frame"></div>
          <div className="square-one"></div>
          <div className="square-two"></div>
          <div className="square-three"></div>
          <div className="square-four"></div>
        </>
      )}
    </>
  );
};

export default Display;
