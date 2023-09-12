import React, { useState } from "react";
import "./Configuration.css";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import "../../Grid.css";
import html2canvas from 'html2canvas';
import Select from "@mui/material/Select"; 
import MenuItem from "@mui/material/MenuItem"; 
import FormControl from "@mui/material/FormControl"; 
import MonstersOverlay from "./MonstersOverlay";

const ConfigDropdown = ({ opacityToggle, setScaleFactorImages }) => {
  const [showInputs, setShowInputs] = useState(false);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);
  const [selectedMonsterOption, setSelectedMonsterOption] = useState("none");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  
  const marks = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];
  
  const [isChanged, setIsChanged] = useState(false);

  const handleMenuClick = () => {
    setShowInputs(!showInputs);
  };

  const handleSelectChange = (e) => {
    setSelectedMonsterOption(e.target.value);
  };

  let contentToRender;

  if (selectedMonsterOption === 'none') {
    contentToRender = <div>None selected</div>;
  } else if (selectedMonsterOption === 'option2') {
    contentToRender = <MonstersOverlay className="monsterContent" monsterName={"Fairy Test"} monsterRank={"Fairy Rank"}/>;
  } else if (selectedMonsterOption === 'option3') {
    contentToRender = <div>Option 3 selected</div>;
  }

  const handleDownload = () => {
    setShowInputs(!showInputs);
    setTimeout(() => {
      const targetElement = document.documentElement;      
      html2canvas(targetElement, {
        width: window.innerWidth,    // Set the width of the screenshot
        height: window.innerHeight,  // Set the height of the screenshot
        x: 0,            // X-coordinate of the top-left corner of the screenshot
        y: 0,            // Y-coordinate of the top-left corner of the screenshot
      }).then((canvas) => {
        // Convert the canvas content to a data URL (PNG image)
        const dataURL = canvas.toDataURL('image/png');
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'screenshot.png'; // Set the filename

        // Trigger a click event on the download link to initiate the download
        downloadLink.click();
      });
    }, 0);
  }


  const handleGenerate = () => {
    console.log("Logic for generating a new map TBC");
  }
  
  return (
    <div>
      <div className="body">
        <div className="dropDown">
          <div id="hamburger" onClick={handleMenuClick}>
            <div className={`container ${showInputs ? 'change' : ''}`}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
        </div>
        </div>
        {showInputs && (
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
                  marks={marks}
                  onChange={(e)=>setScaleFactorImages(e.target.value)}
                />
              </div>
            </div>
            <div className="formGroup">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                onChange={()=>setShowFog(!showFog)}
                label="SHOW FOG"
              />
              <FormControlLabel
                control={<Checkbox/>}
                onChange={()=>setAddRemoveFog(!addRemoveFog)}
                label="ADD/REMOVE FOG"
              />
              <FormControlLabel
                control={<Checkbox/>}
                onChange={opacityToggle}
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
                  color: '#000000', 
                  borderColor: '#000000', 
                  borderWidth: '1px', 
                  margin:'0px 0px 30px 0px',
                }}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            <div className="button-container">
              <div className="button">
                <Button variant="outlined" onClick={handleDownload} style={{
                    color: '#000000', 
                    borderColor: '#000000', 
                    borderWidth: '1px', 
                  }}>
                    DOWNLOAD</Button>
              </div>
              <div className="button">
                <Button variant="outlined" onClick={handleGenerate} 
                  style={{
                    color: '#000000', 
                    borderColor: '#000000', 
                    borderWidth: '1px', 
                  }
                  }>GENERATE</Button>
              </div>
            </div>
            
          </div>
        )}
      </div>
      {contentToRender}
    </div>
  );
};

export default ConfigDropdown;