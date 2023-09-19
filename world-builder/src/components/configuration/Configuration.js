import React, { useState, useContext } from "react";
import styles from "./configuration.module.css"; // Import your CSS module
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import "../../grids/Grid.css";
import html2canvas from "html2canvas";
import MonstersOverlay from "../monstersOverlay/MonstersOverlay";
import { WorldDataContext } from "../../context/worldDataContext";
import emailjs from "@emailjs/browser";
emailjs.init("VDupAfE4CYPyVT2Ry");

const Configuration = ({
  opacityToggle,
  showContent,
  setShowContent,
  gridSize,
  setGridSize,
}) => {
  const { worldData, loading, setWorldData } = useContext(WorldDataContext);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);
  const [selectedMonsterOption, setSelectedMonsterOption] = useState("none");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [text, setButtonText] = useState("Insert your Email");

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleDropdownClose();
    if (option === "png") {
      downloadPNG();
    } else if (option === "json") {
      downloadJSON();
    }
  };

  const shareFile = () => {
    setShowContent(false);
    setSelectedMonsterOption("none");
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
        console.log(dataURL.length / 1024);
        setScreenshot(dataURL);
        setShowContent(true);
      });
    }, 0);
  };

  const sendEmail = () => {
    const currentMonster = selectedMonsterOption;
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
        setShowContent(true);
        setSelectedMonsterOption(currentMonster);
        setOpen(false);
        setEmail("");
      })
      .catch((error) => {
        setButtonText("Error! Please try again.");
        setEmail("");
        console.log("Email failed to send:", error);
        setShowContent(true);
        setSelectedMonsterOption(currentMonster);
      });
  };

  const downloadJSON = () => {
    console.log("JSON");
    if (worldData) {
      const jsonData = JSON.stringify(worldData);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const date = new Date().toISOString();
      const a = document.createElement("a");
      a.href = url;
      a.download = "worldData-" + date + ".json";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const downloadPNG = () => {
    console.log("PNG");
    setShowContent(false);
    const currentMonster = selectedMonsterOption;
    setSelectedMonsterOption("none");
    setTimeout(() => {
      const targetElement = document.documentElement;
      html2canvas(targetElement, {
        width: window.innerWidth, // Set the width of the screenshot
        height: window.innerHeight, // Set the height of the screenshot
        x: 0, // X-coordinate of the top-left corner of the screenshot
        y: 0, // Y-coordinate of the top-left corner of the screenshot
      }).then((canvas) => {
        // Convert the canvas content to a data URL (PNG image)
        const dataURL = canvas.toDataURL("image/png;");
        // Create a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        const date = new Date().toISOString();
        downloadLink.download = "map-" + date + ".png"; // Set the filename
        downloadLink.click();
        setShowContent(true);
        setSelectedMonsterOption(currentMonster);
      });
    }, 0);
  };

  const handleSelectChange = (e) => {
    setSelectedMonsterOption(e.target.value);
  };

  let contentToRender;

  if (selectedMonsterOption === "none") {
    contentToRender = <div></div>;
  } else if (selectedMonsterOption === "option2") {
    contentToRender = (
      <MonstersOverlay
        className={"monsterContent"}
        monsterName={"Fairy Test"}
        monsterRank={"Fairy Rank"}
      />
    );
  } else if (selectedMonsterOption === "option3") {
    contentToRender = <div></div>;
  }

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
      .then((data) => setWorldData(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.body}>
      <div className={styles.configContent}>
        <h2>CONFIGURATION</h2>
        <div className={styles["slider-component"]}>
          <p>GRID SIZE</p>
          <div className={styles.slider}>
            <Slider
              defaultValue={gridSize}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={27}
              max={50}
              onChange={(e) => setGridSize(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              onChange={() => setShowFog(!showFog)}
              label="SHOW FOG"
            />
            <FormControlLabel
              control={<Checkbox />}
              onChange={() => setAddRemoveFog(!addRemoveFog)}
              label="ADD/REMOVE FOG"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="ADD/REMOVE ROOFS"
              onChange={opacityToggle}
            />
          </FormGroup>
        </div>
        <FormControl>
          <p>VIEW MONSTER STATS</p>
          <Select
            value={selectedMonsterOption}
            onChange={handleSelectChange}
            style={{
              color: "#000000",
              borderColor: "#000000",
              borderWidth: "1px",
              margin: "0px 0px 30px 0px",
            }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </FormControl>
        <div className={styles["button-container"]}>
          <div className={styles.button}>
            <Button
              variant="outlined"
              onClick={(e) => handleDropdownOpen(e, setAnchorEl)}
              style={{
                color: "#000000",
                borderColor: "#000000",
                borderWidth: "1px",
                marginTop: "-35px",
                marginLeft: "40px",
              }}
            >
              Save
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDropdownClose}
            >
              <MenuItem onClick={() => handleOptionSelect("png")}>PNG</MenuItem>
              <MenuItem onClick={() => handleOptionSelect("json")}>JSON</MenuItem>
            </Menu>
          </div>
          <div className={styles.button}>
            <Button
              variant="outlined"
              onClick={shareFile}
              style={{
                color: "#000000",
                borderColor: "#000000",
                borderWidth: "1px",
                marginTop: "-35px",
                marginLeft: "20px",
              }}
            >
              Share
            </Button>
          </div>
          <div className={styles.button}>
            <Button
              variant="outlined"
              onClick={handleGenerate}
              style={{
                color: "#000000",
                borderColor: "#000000",
                borderWidth: "1px",
                marginTop: "30px",
                marginLeft: "-305px",
              }}
            >
              GENERATE
            </Button>
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
      </div>
      {contentToRender}
    </div>
  );
};

export default Configuration;

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
