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
import { getMonsterCords } from "../../grids/CalculatePositions";
import emailjs from "@emailjs/browser";
emailjs.init("VDupAfE4CYPyVT2Ry");

const ConfigDropdown = ({
  showContent,
  setShowContent,
  gridSize,
  setGridSize,
}) => {
  const { worldData, loading, setWorldData , opacityValue, setOpacityValue} = useContext(WorldDataContext);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);
  const [selectedMonsterOption, setSelectedMonsterOption] = useState("none");

  const downloadPNG = () => {
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

  // -- Handle Monster Change -------
  const handleSelectChange = (e) => {
    setSelectedMonsterOption(e.target.value);
  };

  let contentToRender;
  const allMonsterCords = getMonsterCords(worldData);

  if (selectedMonsterOption === "none") {
    contentToRender = <div></div>;
  } else {
    let rankVal = "Boss Monster";

    if (selectedMonsterOption.rank === 1) {
      rankVal = "Easy Monster";
    } else if (selectedMonsterOption.rank === 2) {
      rankVal = "Medium Monster";
    } else if (selectedMonsterOption.rank === 3) {
      rankVal = "Hard Monster";
    }

    contentToRender = (
      <MonstersOverlay
        className={styles.monsterContent} 
        monsterName={selectedMonsterOption.name}
        monsterRank={rankVal}
        monsterSTR={"0." + selectedMonsterOption.str}
        monsterDEX={"0." + selectedMonsterOption.dex}
        monsterCON={"0." + selectedMonsterOption.con}
        monsterINT={"0." + selectedMonsterOption.int}
        enviro={selectedMonsterOption.environment}
        rankInt={selectedMonsterOption.rank}
      />
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.configContent}>
      <h2><b>CONFIGURATION</b></h2>
        <div className={styles.sliderComponent}>
          <p><b>GRID SIZE</b></p>
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
              onChange={() => setShowFog(!showFog)} // Implement setShowFog
              label="SHOW FOG"
            />
            <FormControlLabel
              control={<Checkbox />}
              onChange={() => setAddRemoveFog(!addRemoveFog)} // Implement setAddRemoveFog
              label="ADD/REMOVE FOG"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="ADD/REMOVE ROOFS"
              onChange={()=> setOpacityValue()}
            />
          </FormGroup>
        </div>
        <FormControl>
          <p><b>VIEW MONSTER STATS</b></p>
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
            {allMonsterCords.map((monsterCord, index) => (
              <MenuItem key={index} value={monsterCord}>
                {monsterCord.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {contentToRender}
    </div>
  );
};

export default ConfigDropdown;
