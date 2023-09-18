import React, { useState } from "react";
import "./Sidebar.css";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ConfigDropdown from "./Configuration";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";

const SideBar = ({opacityToggle}) => {
    const {worldData, setWorldData} = useContext(WorldDataContext);
    const [gridSize, setGridSize] = useState(27);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const [configOpen, setConfigOpen] = useState(false);
  const configuration = configOpen && isOpen ? "config open" : "config";
  const buttonClass1 =
    isOpen && configOpen ? "sidebar-toggle hide" : "sidebar-toggle";
  const buttonClass2 =
    isOpen && configOpen
      ? "sidebar-toggle configOpen"
      : "sidebar-toggle2";
      const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080"




  const handleGenerate = () => {
    fetch(API_URL+"/world", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        size:gridSize
      })
    }).then((response)=>response.json()).then((data)=>setWorldData(data)).catch((error)=>console.log(error));
  };

    const buttonHandler = () =>{
        setIsOpen(!isOpen);
        setConfigOpen(false);
    }
  return (
    <div className="sidebar-container">
      <div className={sidebarClass}>
        <SettingsIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={() => setConfigOpen(!configOpen)}
        />
        <DownloadIcon className="large-icon" fontSize="" color="" />
        <ContentCopyIcon className="large-icon" fontSize="" color="" />
        <ShareIcon className="large-icon" fontSize="" />
        <PlayArrowIcon className="large-icon" fontSize="" color="" onClick={handleGenerate} />

        <div className={buttonClass1}>
          <div className="hamburger" onClick={buttonHandler}>
            <div className={`container ${isOpen ? "change" : ""}`}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={configuration}>
        <ConfigDropdown opacityToggle={opacityToggle} showContent={configOpen} setShowContent={setConfigOpen} gridSize={gridSize} setGridSize={setGridSize}/>
        <div className={buttonClass2}>
          <div className="hamburger" onClick={buttonHandler}>
            <div className={`container ${isOpen ? "change" : ""}`}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
    
  );
};
export default SideBar;
