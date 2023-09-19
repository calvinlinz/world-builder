import React, { useEffect, useState } from "react";
import BackgroundGrid from "../../grids/BackgroundGrid";
import BuildingsGrid from "../../grids/BuildingsGrid";
import NaturalFeaturesGrid from "../../grids/NaturalFeaturesGrid";
import CaveGrid from "../../grids/CaveGrid";
import RoofGrid from "../../grids/RoofGrid";
import CampGrid from "../..//grids/CampGrid";
import PathGrid from "../../grids/PathGrid";
import MonsterGrid from "../../grids/MonsterGrid";
import "../../grids/Grid.css";
import "./Display.css";
import SideBar from "../..//components/sidebar/Sidebar";
import Loading from "../../components/loading/loading";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";

const Display = ({worldData, loading,setLoading}) => {
  const [opacityValue, setOpacity] = useState(1);
  const [scaleFactor, setScaleFactor] = useState(0.25);
  const [renderTimeout, setRenderTimeout] = useState(true);
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

  useEffect(()=>{
    setRenderTimeout(false)
  },[])

  return (
    <>
      <SideBar opacityToggle={toggleOpactiy} />
      {loading ? (
        <Loading />
      ) : renderTimeout ? (
        <Loading />
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
          <MonsterGrid worldData={worldData} scaleFactor={scaleFactor}/>
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
