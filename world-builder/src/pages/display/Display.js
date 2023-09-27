import React, { useEffect, useState, useRef, useContext } from "react";
import BackgroundGrid from "../../grids/BackgroundGrid";
import BuildingsGrid from "../../grids/BuildingsGrid";
import NaturalFeaturesGrid from "../../grids/NaturalFeaturesGrid";
import CaveGrid from "../../grids/CaveGrid";
import CaveCoverGrid from "../../grids/CaveCoverGrid";
import RoofGrid from "../../grids/RoofGrid";
import CampGrid from "../..//grids/CampGrid";
import PathGrid from "../../grids/PathGrid";
import MonsterGrid from "../../grids/MonsterGrid";
import "../../grids/Grid.css";
import "./Display.css";
import SideBar from "../../components/sidebar/Sidebar";
import Loading from "../../components/loading/loading";
import { WorldDataContext } from "../../context/worldDataContext";

const Display = ({clientRef}) => {
  const { worldData, loading, host ,setLoading, setWorldData, setHistory, gameId, opacityRoofValue, opacityCaveValue, sendMessage} = useContext(WorldDataContext);
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  let scaleFactor = 0.25;
  const [renderTimeout, setRenderTimeout] = useState(true);
  const dragRef = useRef();
  let isDragging = false;
  const startX = useRef(0);
  const startY = useRef(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    dragRef.current.classList.add("dragging");
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    window.scrollBy(-deltaX, -deltaY);
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging = false;
    dragRef.current.classList.remove("dragging");
  };


  useEffect(() => {
    setRenderTimeout(false);
    if(host){
      fetch(API_URL + "/game/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size: 27,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setWorldData(data);
          setLoading(false);
          setHistory(data);
          sendMessage(data, opacityRoofValue === 1 ? true : false, opacityCaveValue === 1 ? true : false);
        })
        .catch((error) => console.log(error));
    }else{
      fetch(API_URL + "/game/view")
        .then((response) => response.json())
        .then((data) => {
          setWorldData(data);
          setLoading(false);
          setHistory(data);
        })
        .catch((error) => console.log(error));
    }

  }, []);

  return (
    <>
      {host ? <SideBar/> : null}
      {loading ? (
        <Loading />
      ) : renderTimeout ? (
        <Loading />
      ) : (
        <div className="world">
          <div id="render">
            <BackgroundGrid worldData={worldData} />
            <PathGrid worldData={worldData} />

            <CaveCoverGrid />
            <BuildingsGrid scaleFactor={scaleFactor} worldData={worldData} />
            <NaturalFeaturesGrid
              scaleFactor={scaleFactor}
              worldData={worldData}
            />
            <CaveGrid scaleFactor={scaleFactor} worldData={worldData} />
            <RoofGrid scaleFactor={scaleFactor} worldData={worldData} />
            <CampGrid scaleFactor={scaleFactor} worldData={worldData} />
            <MonsterGrid worldData={worldData} scaleFactor={scaleFactor} />
          </div>
          <div
            className="frame"
            ref={dragRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
          <div className="square-one"></div>
          <div className="square-two"></div>
          <div className="square-three"></div>
          <div className="square-four"></div>
        </div>
      )}
    </>
  );
};

export default Display;
