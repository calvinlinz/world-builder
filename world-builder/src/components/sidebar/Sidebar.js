import React, { useState } from "react";
import "./Sidebar.css";
import TuneIcon from "@mui/icons-material/Tune";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import Configuration from "../configuration/Configuration";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Loading from "../loading/loading";
import ImportExport from "../importExport/importExport";
import emailjs from "@emailjs/browser";
import RefreshIcon from "@mui/icons-material/Refresh";
import debounce from "lodash/debounce";

import {
  Menu,
  Button,
  MenuItem,
  FormControl,
  Select,
  Modal,
  Typography,
  Box,
  Input,
} from "@mui/material";
import html2canvas from "html2canvas";
emailjs.init("VDupAfE4CYPyVT2Ry");

const SideBar = ({ opacityToggle }) => {
  const [open, setOpen] = useState(false);
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
  const [text, setButtonText] = useState("Insert your Email");
  const [email, setEmail] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const shareFile = () => {
    setIsOpen(false);
    setTimeout(() => {
      const targetElement = document.documentElement;
      html2canvas(targetElement, {
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0,
      }).then((canvas) => {
        setOpen(true);
        const dataURL = canvas.toDataURL("image/jpeg", 0.2);
        setScreenshot(dataURL);
        setIsOpen(true);
      });
    }, 0);
  };

  const sendEmail = () => {
    const emailParams = {
      to_email: email,
      message: "Attached file are your world data as PNG format and raw data!",
      file: btoa(JSON.stringify(worldData)),
      image: screenshot,
    };
    emailjs
      .send("service_123456789", "template_mv7apne", emailParams)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setOpen(false);
        setEmail("");
      })
      .catch((error) => {
        setButtonText("Error! Please try again.");
        setEmail("");
        console.log("Email failed to send:", error);
        setOpen(true);
      });
  };

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
      setSlideContent(<ImportExport />);
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
    if ((slideOpen && type.type != slideContent.type) || timeoutActive) {
      return;
    }
    timeoutActive = true;
    if (!slideOpen) {
      setSlideOpen(true);
      setTimeout(() => {
        setSlideButtonOpen(true);
        timeoutActive = false;
      }, 50);
    } else {
      setSlideOpen(false);
      setTimeout(() => {
        setSlideButtonOpen(false);
        timeoutActive = false;
      }, 150);
    }

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
        <TuneIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={()=>{
            handleSlideContent("settings");
            slideHandler(<Configuration />);
          }} // Adjust the delay (300 milliseconds in this example)
        />
        <CloudUploadOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={() => {
            handleSlideContent("import");
            slideHandler(<ImportExport />);
          }} // Adjust the delay (300 milliseconds in this example)
        />
        <ContentCopyOutlinedIcon className="large-icon" fontSize="" color="" />
        <ShareOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={shareFile}
        />
        <RefreshIcon
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
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {text}
            </Typography>
            <Input
              id="modal-modal-description"
              sx={{
                mt: 2,
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                width: "100%",
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button
              variant="outlined"
              onClick={sendEmail}
              style={{
                color: "#000000",
                borderColor: "#000000",
                borderWidth: "1px",
                marginTop: "-185px",
                marginLeft: "300px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default SideBar;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
