import React, { useState } from "react";
import "./Configuration.css";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Menu, Button, MenuItem, FormControl, Select } from "@mui/material";
import "../../Grid.css";
import html2canvas from "html2canvas";
import MonstersOverlay from "./MonstersOverlay";

const ConfigDropdown = ({ opacityToggle, setScaleFactorImages, worldData }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);
  const [selectedMonsterOption, setSelectedMonsterOption] = useState("none");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [showContent, setShowContent] = useState(true);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleDropdownClose();
    if (option == "png") {
      downloadPNG();
    } else if (option == "json") {
      downloadJSON();
    }
  };

  const downloadJSON = () => {
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
        downloadLink.download = "map-"+date+".png"; // Set the filename
        downloadLink.click();
        setShowContent(true);
        setSelectedMonsterOption(currentMonster);
      });
    }, 0);
  };

  const handleMenuClick = () => {
    setShowInputs(!showInputs);
  };

  const handleSelectChange = (e) => {
    setSelectedMonsterOption(e.target.value);
  };

  let contentToRender;

  if (selectedMonsterOption === "none") {
    contentToRender = <div>None selected</div>;
  } else if (selectedMonsterOption === "option2") {
    contentToRender = (
      <MonstersOverlay
        className="monsterContent"
        monsterName={"Fairy Test"}
        monsterRank={"Fairy Rank"}
      />
    );
  } else if (selectedMonsterOption === "option3") {
    contentToRender = <div>Option 3 selected</div>;
  }

  const handleGenerate = () => {
    console.log("Logic for generating a new map TBC");
  };

  return (
    <div className="body">
      {showContent && (
        <div className="dropDown">
          <div id="hamburger" onClick={handleMenuClick}>
            <div className={`container ${showInputs ? "change" : ""}`}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
      )}

      {showContent && showInputs && (
        <div className="content">
          <div className="slider-component">
            <p>GRID ZOOM</p>
            <div className="slider">
              <Slider
                defaultValue={0.25}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={3}
                max={7}
                // onChange={(e) => setScaleFactorImages(e.target.value)} // You need to implement setScaleFactorImages
              />
            </div>
          </div>
          <div className="formGroup">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                // onChange={() => setShowFog(!showFog)} // Implement setShowFog
                label="SHOW FOG"
              />
              <FormControlLabel
                control={<Checkbox />}
                // onChange={() => setAddRemoveFog(!addRemoveFog)} // Implement setAddRemoveFog
                label="ADD/REMOVE FOG"
              />
              <FormControlLabel
                control={<Checkbox />}
                // onChange={opacityToggle} // Implement opacityToggle
                label="ADD/REMOVE ROOFS"
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

          <div className="button-container">
            <div className="button">
              <Button
                variant="outlined"
                onClick={handleDropdownOpen}
                style={{
                  color: "#000000",
                  borderColor: "#000000",
                  borderWidth: "1px",
                }}
              >
                Save
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
              >
                <MenuItem onClick={() => handleOptionSelect("png")}>
                  PNG
                </MenuItem>
                <MenuItem onClick={() => handleOptionSelect("json")}>
                  JSON
                </MenuItem>
              </Menu>
            </div>

            <div className="button">
              <Button
                variant="outlined"
                onClick={handleGenerate}
                style={{
                  color: "#000000",
                  borderColor: "#000000",
                  borderWidth: "1px",
                }}
              >
                GENERATE
              </Button>
            </div>
          </div>
        </div>
      )}
      {showContent && contentToRender}
    </div>
  );
};
export default ConfigDropdown;
