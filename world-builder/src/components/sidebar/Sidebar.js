import React, { useState } from "react";
import "./Sidebar.css";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ConfigDropdown from "../configuration/Configuration";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";

const SideBar = ({ opacityToggle }) => {
  const { worldData, loading, setWorldData } = useContext(WorldDataContext);
  const [gridSize, setGridSize] = useState(27);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const [configOpen, setConfigOpen] = useState(false);
  const [configButtonOpen, setConfigButtonOpen] = useState(false);
  const configuration = configOpen && isOpen ? "config open" : "config";
  const buttonClass = isOpen && configOpen ? "config-toggle" : "sidebar-toggle";
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

  const handleGenerate = () => {
    setWorldData(worldData, true);
    fetch(API_URL + "/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        size: gridSize,
      }),
    })
      .then((response) => response.json())
      .then((data) => setWorldData(data, false))
      .catch((error) => console.log(error));
  };

  const buttonHandler = () => {
    setIsOpen(!isOpen);
    setConfigOpen(false);
    setTimeout(() => {
      setConfigButtonOpen(false);
    }, 300);
  };

  const configHandler = () => {
    setConfigOpen(!configOpen);
    if(!configOpen){
      setTimeout(() => {
        setConfigButtonOpen(!configButtonOpen);
      }, 50);
    }else{
      setTimeout(() => {
        setConfigButtonOpen(!configButtonOpen);
      }, 150);
    }
  };
  return (
    <div className="sidebar-container">
      <div className={configuration}>
        <ConfigDropdown
          opacityToggle={opacityToggle}
          showContent={configOpen}
          setShowContent={setConfigOpen}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
        {configButtonOpen && (
          <div className={buttonClass}>
            <div className="hamburger" onClick={buttonHandler}>
              <div className={`container ${isOpen ? "change" : ""}`}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={sidebarClass}>
        <SettingsOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={configHandler}
        />
        <DownloadOutlinedIcon className="large-icon" fontSize="" color="" />
        <ContentCopyOutlinedIcon className="large-icon" fontSize="" color="" />
        <ShareOutlinedIcon className="large-icon" fontSize="" color=""/>
        <PlayArrowOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={handleGenerate}
        />
        {!configButtonOpen && (
          <div className={buttonClass}>
            <div className="hamburger" onClick={buttonHandler}>
              <div className={`container ${isOpen ? "change" : ""}`}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SideBar;
