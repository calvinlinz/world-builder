import React, { useState } from "react";
import "./Configuration.css";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import "../../Grid.css";

const ConfigDropdown = ({opacityToggle}) => {
  const [showInputs, setShowInputs] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(0.33);
  const [numberOfRooms, setNumberOfRooms] = useState(5);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);

  
  
  const marks = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];
  
  const [isChanged, setIsChanged] = useState(false);

  const handleMenuClick = () => {
    setShowInputs(!showInputs);
  };

  const handleDownload = () => {
    console.log("Download Logic TBC");
  }

  const handleChangeScale = (e) => {
      const newScaleFactor = e/10;
      setScaleFactor(newScaleFactor);
      document.documentElement.style.setProperty('--scale-factor', newScaleFactor);
 
  }

  return (
    <div className="body">
      <div className="dropDown">
        <div id="hamburger" onClick={handleMenuClick}>
          <div className={`container ${showInputs ? 'change' : ''}`}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
      </div>
        <h1 id="generate">GENERATE</h1>
      </div>
      {showInputs && (
        <div className="content">
          <div className="slider-component">
            <p>GRID SIZE</p>
            <div className="slider">
              <Slider
                defaultValue={scaleFactor}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                marks={marks}
                onChange={(e)=>handleChangeScale(e.target.value)}
              />
            </div>
          </div>
          <div className="slider-component">
            <p>ROOMS</p>
            <div className="slider">
              <Slider
                defaultValue={numberOfRooms}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                onChange={(e)=>setNumberOfRooms(e.target.value)}
                marks={marks}
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
          <div className="button">
          <Button variant="outlined" onClick={handleDownload}>DOWNLOAD</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigDropdown;