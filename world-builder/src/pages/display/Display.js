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
import PlayerCount from "../../components/playerCount/playerCount";
import { send } from "@emailjs/browser";
const Display = () => {
  const {
    worldData,
    loading,
    host,
    opacityCaveValue,
    opacityRoofValue,
    setWorldData,
    setHistory,
    gameId,
    sendMessage,
    currentPlayersInGame,
    frameValue,
  } = useContext(WorldDataContext);
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  let scaleFactor = 0.25;
  const [renderTimeout, setRenderTimeout] = useState(true);
  const dragRef = useRef();
  let isDragging = false;
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const handleMouseDown = (e) => {
    console.log(frameValue + " from disply.js");
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

  const handleMouseUp = (e) => {
    isDragging = false;
    dragRef.current.classList.remove("dragging");
    if (host) {
      currentX.current = window.scrollX || window.pageXOffset;
      currentY.current = window.scrollY || window.pageYOffset;
      sendMessage(worldData, opacityRoofValue, opacityCaveValue, currentPlayersInGame, currentX.current, currentY.current);
    }
  };

  useEffect(() => {
    setRenderTimeout(false);
    async function fetchWorld() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      };
      const response = await fetch(API_URL + "/game/view", options);
      if (response.status === 200) {
        const data = await response.json();
        setWorldData(data, false);
        setHistory(data);
        return;
      }
      const newBody = JSON.parse(options.body);
      newBody.size = 27;
      options.body = JSON.stringify(newBody);
      const responseGenerate = await fetch(API_URL + "/game/generate", options);
      const data = await responseGenerate.json();
      setWorldData(data, false);
      setHistory(data);
    }
    fetchWorld();
  }, []);

  return (
    <>
      <SideBar />
      {loading ? (
        <Loading />
      ) : renderTimeout ? (
        <Loading />
      ) : (
        <div className="world">
          <PlayerCount />
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
            className={frameValue ? "frame" : "full-screen"}
            ref={dragRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></div>
        </div >
      )}
    </>
  );
};

export default Display;
