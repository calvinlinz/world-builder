import React, { useRef, useState, useEffect } from "react";
import "./Sidebar.css";
import TuneIcon from "@mui/icons-material/Tune";
import FullScreen from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Configuration from "../configuration/Configuration";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImportExport from "../importExport/importExport";
import emailjs from "@emailjs/browser";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Modal, Typography, Box, Input } from "@mui/material";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import html2canvas from "html2canvas";
import History from "../history/history";
import HistoryIcon from "@mui/icons-material/History";
import jsPDF from "jspdf";
import { getBuildingCords, getCaveCords } from "../../grids/CalculatePositions";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../loading/loading";
emailjs.init("VDupAfE4CYPyVT2Ry");

const SideBar = ({ frameValue, setFrameState }) => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const {
    worldData,
    setWorldData,
    setHistory,
    loading,
    setBuildingCords,
    setCaveCords,
    sendMessage,
    gameId,
    currentPlayersInGame,
    currentScrollX,
    currentScrollY,
    host,
  } = useContext(WorldDataContext);
  const [gridSize, setGridSize] = useState(27);
  const [isOpen, setIsOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [slideContent, setSlideContent] = useState(null);
  const [slideButtonOpen, setSlideButtonOpen] = useState(false);
  const [text, setButtonText] = useState("Insert your Email");
  const [email, setEmail] = useState("");
  const sideBarRef = useRef();
  const configuration = slideOpen && isOpen ? "config open" : "config";
  const buttonClass = isOpen && slideOpen ? "config-toggle" : "sidebar-toggle";
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";
  const notification = (message) => toast.success(message);

  let timeoutActive = false;

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setIsOpen(false);
      setSlideOpen(false);
      setTimeout(() => {
        setSlideButtonOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (!host) {
      document.documentElement.style.setProperty(
        "--item-one-content",
        "'Resize'"
      );
      document.documentElement.style.setProperty(
        "--item-two-content",
        "'Save'"
      );
      document.documentElement.style.setProperty(
        "--item-three-content",
        "'History'"
      );
      document.documentElement.style.setProperty(
        "--item-four-content",
        "'Print'"
      );
      document.documentElement.style.setProperty(
        "--item-five-content",
        "'Share'"
      );

    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [host]);

  const handleFrame = (e) => {
    let newValue = !frameValue;
    setFrameState(newValue);
  };

  const handleHtml2Canvas = async () => {
    const world = document.querySelector("#render");
    const worldBackground = frameValue
      ? document.querySelector(".grid-container-background-stretched")
      : document.querySelector(".grid-container-background");
    const cell = document.querySelector(".grid-cell");
    const cellWidth = cell.clientWidth;
    const cellHeight = cell.clientHeight;
    const height = worldBackground.clientHeight - cellHeight / 2;
    const width = worldBackground.clientWidth - cellWidth * 2;
    const x = worldBackground.offsetLeft + cellWidth;
    const y = worldBackground.offsetTop + cellHeight / 2;
    const canvas = await html2canvas(world, {
      width: width,
      height: height,
      x: x,
      y: y,
    });
    return canvas;
  };

  const handlePrint = async () => {
    setLoad(true);
    const canvas = await handleHtml2Canvas();
    const dataURL = canvas.toDataURL("image/jpeg", 0.4);
    const pdf = new jsPDF({
      orientation: "landscape",
    });
    const imgProps = pdf.getImageProperties(dataURL);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.autoPrint();
    window.open(pdf.output("bloburl"), "_blank");
    setLoad(false);
  };

  const sendEmail = async () => {
    setButtonText("Sending...");
    setLoad(true);
    const canvas = await handleHtml2Canvas();
    var dataURL = canvas.toDataURL("image/jpeg", 0.4);
    if (dataURL.length / 1024 > 500) {
      dataURL = canvas.toDataURL("image/jpeg", 0.1);
    }
    const emailParams = {
      to_email: email,
      message: "Attached files are your D&D map as PNG image and raw data within a JSON file!",
      file: btoa(JSON.stringify(worldData)),
      image: dataURL,
    };
    emailjs
      .send("service_123456789", "template_mv7apne", emailParams)
      .then((response) => {
        setOpen(false);
        setEmail("");
        setButtonText("Insert your Email");
        notification("Email sent successfully!");
        setLoad(false);
      })
      .catch((error) => {
        notification("Email failed to send!");
        setButtonText("Error! Please try again.");
        console.log("Email failed to send:", error);
        setOpen(true);
        setEmail("");
        setLoad(false);
      });
  };

  const handleGenerate = async () => {
    if (loading) {
      return;
    }
    setWorldData(worldData, true);
    async function fetchWorld() {
      const response = await fetch(API_URL + "/game/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size: gridSize,
          gameId: gameId,
        }),
      });
      const data = await response.json();
      setWorldData(data, false);
      setHistory(data);
      const buildingCords = getBuildingCords(data);
      const caveCords = getCaveCords(data);
      setBuildingCords(buildingCords);
      setCaveCords(caveCords);
      sendMessage(
        data,
        buildingCords,
        caveCords,
        currentPlayersInGame,
        currentScrollX,
        currentScrollY
      );
    }
    await fetchWorld();
  };

  const handleSlideContent = (type) => {
    if (type == "settings") {
      setSlideContent(
        <Configuration
          showContent={slideOpen}
          setShowContent={setSlideOpen}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      );
      slideHandler(<Configuration />);
    } else if (type == "import") {
      setSlideContent(<ImportExport />);
      slideHandler(<ImportExport />);
    } else if (type == "history") {
      setSlideContent(<History />);
      slideHandler(<History />);
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
    <>
      {!load ? (
        <div className="sidebar-container" ref={sideBarRef}>
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
            <nav>
              <ul>
                {host && (
                  <li onClick={() => handleSlideContent("settings")}>
                    <TuneIcon
                      className="large-icon"
                      fontSize=""
                      color=""
                      onClick={() => handleSlideContent("settings")}
                    />
                  </li>
                )}
                <li onClick={handleFrame}>
                  {frameValue ? (
                    <FullscreenExitIcon
                      className="large-icon"
                      style={{ fontSize: "50px", marginTop: "10px" }}
                      fontSize=""
                      color=""
                    />
                  ) : (
                    <FullScreen
                      className="large-icon"
                      style={{ fontSize: "50px", marginTop: "10px" }}
                      fontSize=""
                      color=""
                    />
                  )}
                </li>
                <li onClick={() => handleSlideContent("import")}>
                  <CloudUploadOutlinedIcon
                    className="large-icon"
                    fontSize=""
                    color=""
                  />
                </li>

                <li onClick={() => handleSlideContent("history")}>
                  <HistoryIcon className="large-icon" fontSize="" color="" />
                </li>
                <li onClick={handlePrint}>
                  <LocalPrintshopOutlinedIcon
                    className="large-icon"
                    fontSize=""
                    color=""
                  />
                </li>
                <li onClick={() => setOpen(true)}>
                  <ShareOutlinedIcon
                    className="large-icon"
                    fontSize=""
                    color=""
                  />
                </li>
                <li onClick={handleGenerate}>
                  {host && (
                    <RefreshIcon className="large-icon" fontSize="" color="" />
                  )}
                </li>
              </ul>
            </nav>

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
            <ToastContainer
              autoClose={2000}
              position="top-center"
              theme="dark"
              toastStyle={{ backgroundColor: "#1f1f1f" }}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
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
