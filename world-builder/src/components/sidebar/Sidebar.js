import React, { useRef, useState, useEffect } from "react";
import "./Sidebar.css";
import TuneIcon from "@mui/icons-material/Tune";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Configuration from "../configuration/Configuration";
import { useContext } from "react";
import { WorldDataContext } from "../../context/worldDataContext";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImportExport from "../importExport/importExport";
import emailjs from "@emailjs/browser";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Modal, Typography, Box, Input } from "@mui/material";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
emailjs.init("VDupAfE4CYPyVT2Ry");

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { worldData, setWorldData} = useContext(WorldDataContext);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleHtml2Canvas = async () => {
    const world = document.querySelector("#render");
    const worldBackground = document.querySelector(
      ".grid-container-background"
    );
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
    })
    return canvas;
  }

  const handlePrint = async () => {
    const canvas = await handleHtml2Canvas();
    const dataURL = canvas.toDataURL("image/jpeg", 0.4);
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    const imgProps= pdf.getImageProperties(dataURL);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.autoPrint();
    window.open(pdf.output('bloburl'), '_blank');
  }

  const sendEmail = async () => {
    setButtonText("Sending...");
    const canvas = await handleHtml2Canvas();
    const dataURL = canvas.toDataURL("image/jpeg", 0.4);
    const emailParams = {
      to_email: email,
      message: "Attached file are your world data as PNG format and raw data!",
      file: btoa(JSON.stringify(worldData)),
      image: dataURL,
    };
    emailjs
      .send("service_123456789", "template_mv7apne", emailParams)
      .then((response) => {
        setOpen(false);
        setEmail("");
        setButtonText("Insert your Email");
      })
      .catch((error) => {
        setButtonText("Error! Please try again.");
        console.log("Email failed to send:", error);
        setOpen(true);
        setEmail("");
      });
  };

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
        <TuneIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={() => {
            handleSlideContent("settings");
            slideHandler(<Configuration />);
          }}
        />
        <CloudUploadOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={() => {
            handleSlideContent("import");
            slideHandler(<ImportExport />);
          }} 
        />
        <LocalPrintshopOutlinedIcon className="large-icon" fontSize="" color="" onClick={handlePrint} />
        <ShareOutlinedIcon
          className="large-icon"
          fontSize=""
          color=""
          onClick={() => {
            setOpen(true);
          }}
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
