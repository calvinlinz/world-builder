import React, { useState } from "react";
import "./Configuration.css";
import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";


const ConfigDropdown = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [gridSize, setGridSize] = useState(5);
  const [numberOfRooms, setNumberOfRooms] = useState(5);
  const [showFog, setShowFog] = useState(true);
  const [addRemoveFog, setAddRemoveFog] = useState(false);
  
  const marks = [
    { value: 1, label: "1" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ];

  const handleDownload = () => {
    console.log("Download Logic TBC");
  }

  return (
    <div className="body">
      <div className="dropDown">
        <h1 id="arrow" onClick={()=>setShowInputs(!showInputs)}>
          {showInputs ? "▼" : "►"}
        </h1>
        <h1 id="generate">Generate</h1>
      </div>
      {showInputs && (
        <div className="content">
          <div className="slider-component">
            <p>Grid Size</p>
            <div className="slider">
              <Slider
                defaultValue={gridSize}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={1}
                max={10}
                marks={marks}
                onChange={(e)=>setGridSize(e.target.value)}
              />
            </div>
          </div>
          <div className="slider-component">
            <p>Rooms</p>
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
              label="Show Fog"
            />
            <FormControlLabel
              control={<Checkbox/>}
              onChange={()=>setAddRemoveFog(!addRemoveFog)}
              label="Add/Remove Fog"
            />
          </FormGroup>
          </div>
          <div className="button">
          <Button variant="outlined" onClick={handleDownload}>Download</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigDropdown;
