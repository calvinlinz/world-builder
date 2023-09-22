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
import SideBar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/loading";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";

const Display = () => {
  const { worldData, loading} = useContext(WorldDataContext);
  const [scaleFactor, setScaleFactor] = useState(0.25);
  const [renderTimeout, setRenderTimeout] = useState(true);

  useEffect(()=>{
    setRenderTimeout(false)
  },[])

  return (
    <>
      <SideBar/>
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
