import React, { useState, useContext,useEffect } from "react";
import styles from "./configuration.module.css"; // Import your CSS module
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import "../../grids/Grid.css";
import MonstersOverlay from "../monstersOverlay/MonstersOverlay";
import { WorldDataContext } from "../../context/worldDataContext";
import { getMonsterCords } from "../../grids/CalculatePositions";
import emailjs, { send } from "@emailjs/browser";
emailjs.init("VDupAfE4CYPyVT2Ry");

const ConfigDropdown = ({
  gridSize,
  setGridSize,
}) => {
  const { worldData, roofOpacity, caveOpacity, setRoofOpacity, setCaveOpacity} = useContext(WorldDataContext);


  const handleRoofs = (e) =>{
    const newValue = roofOpacity == 1 ? 0 : 1;
    setRoofOpacity(newValue)
  }

  const handleCaves = (e) =>{
    const newValue = caveOpacity == 1 ? 0 : 1;
    setCaveOpacity(newValue);
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
              control={<Checkbox />}
              label="SHOW/HIDE ROOFS"
              onChange={handleRoofs}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="SHOW/HIDE CAVES"
              onChange={handleCaves}
            />
          </FormGroup>
        </div>
        {/* <FormControl>
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
        </FormControl> */}
      </div>
      {/* {contentToRender} */}
    </div>
  );
};

export default ConfigDropdown;
