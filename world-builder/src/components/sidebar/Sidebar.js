import React, { useState } from "react";
import "./Sidebar.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Configuration from "../configuration/configuration";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Loading from "../loading/loading";
import ImportExport from "../importExport/importExport";

const SideBar = ({ opacityToggle }) => {
  const { worldData, loading, setWorldData } = useContext(WorldDataContext);
  const [gridSize, setGridSize] = useState(27);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const [slideOpen, setSlideOpen] = useState(false);
  const [slideContent, setSlideContent] = useState(null);
  const [slideButtonOpen, setSlideButtonOpen] = useState(false);
  const configuration = slideOpen && isOpen ? "config open" : "config";
  const buttonClass = isOpen && slideOpen ? "config-toggle" : "sidebar-toggle";
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  let timeoutActive = false;
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

  const handleSlideContent = (type) => {
    if (type == "settings") {
      setSlideContent(
        <Configuration
          opacityToggle={opacityToggle}
          showContent={slideOpen}
          setShowContent={setSlideOpen}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      );
    } else if (type == "import") {
      setSlideContent(
        <ImportExport

        />
      );
    }
  };

  const buttonHandler = () => {
    setIsOpen(!isOpen);
    setSlideOpen(false);
    setTimeout(() => {
      setSlideButtonOpen(false);
    }, 300);
  };


  const slideHandler = (type) => {
    if(slideOpen && type.type != slideContent.type){
      return;
    }

    if (timeoutActive) {
      return; // Don't execute if the timeout is active
    }
  
    timeoutActive = true; // Set the flag to indicate that the timeout is active
  
    setSlideOpen(!slideOpen);
  
    if (!slideOpen) {
      setTimeout(() => {
        setSlideButtonOpen(!slideButtonOpen);
        timeoutActive = false; 
      }, 50);
    } else {
      setTimeout(() => {
        setSlideButtonOpen(!slideButtonOpen);
        timeoutActive = false; 
      }, 150);
    }
    setTimeout(() => {
      setSlideButtonOpen(!slideButtonOpen);
      timeoutActive = false; // Reset the flag when the timeout completes
    }, 50);
  };

  return (
    <div className="sidebar-container">
      <div className={configuration}>
        {slideContent}
        {slideButtonOpen && (
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
          onClick={() => {
            handleSlideContent("settings");
            slideHandler(<Configuration/>);
          }}
        />
        <ImportExportOutlinedIcon className="large-icon" fontSize="" color=""onClick={() => {
            handleSlideContent("import");
            slideHandler(<ImportExport/>);
          }} />
        <CloudUploadOutlinedIcon className="large-icon" fontSize="" color="" />
        <ContentCopyOutlinedIcon className="large-icon" fontSize="" color="" />
        <ShareOutlinedIcon className="large-icon" fontSize="" color="" />
        <PlayArrowOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={handleGenerate}
        />
        {!slideButtonOpen && (
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
