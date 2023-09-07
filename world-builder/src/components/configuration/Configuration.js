import React, { useState } from "react";
import "./Configuration.css";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import "../../Grid.css";

const ConfigDropdown = ({ opacityToggle, setScaleFactorImages }) => {
  const [showInputs, setShowInputs] = useState(false);
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


  const handleGenerate = () => {
    console.log("Logic for generating a new map TBC");
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
      </div>
      {showInputs && (
        <div className="content">
          <div className="slider-component">
            <p>GRID ZOOM</p>
            <div className="slider">
              <Slider
                defaultValue={0.33}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={3}
                max={7}
                marks={marks}
                onChange={(e)=>setScaleFactorImages(e.target.value)}
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
              <Button variant="outlined" onClick={handleDownload} 
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
  );
};

export default ConfigDropdown;