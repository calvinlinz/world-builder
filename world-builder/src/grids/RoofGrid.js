import React, { useEffect, useState, useContext } from "react";
import "./Grid.css";
import { allImages } from "./Constants";
import { getBuildingCords } from "./CalculatePositions";
import { WorldDataContext } from "../context/worldDataContext";
const RoofGrid = ({ scaleFactor }) => {
  const {
    worldData,
    currentPlayersInGame,
    buildingCords,
    setBuildingCords,
    sendMessage,
    caveCords,
    host,
  } = useContext(WorldDataContext);

  const imageMapping = {
    5: allImages.buildingImages.roof_red_2x2,
    6: allImages.buildingImages.roof_red_2x3,
    7: allImages.buildingImages.roof_red_3x3,
    8: allImages.buildingImages.roof_red_4x4,
    9: allImages.buildingImages.roof_red_4x6,
    10: allImages.buildingImages.roof_red_5x5,
    11: allImages.buildingImages.roof_red_6x3,
    12: allImages.buildingImages.roof_red_6x8,
    13: allImages.buildingImages.roof_red_7x8,
  };

  const handleFog = (index) => {
    if (host) {
      const newRoofs = [...buildingCords];
      newRoofs[index] = {
        ...newRoofs[index],
        opacity: newRoofs[index].opacity == 1 ? 0 : 1,
      };
      setBuildingCords(newRoofs);
      sendMessage(
        worldData,
        newRoofs,
        caveCords,
        currentPlayersInGame,
        window.scrollX,
        window.scrollY
      );

    }
  };
  return (
    <div>
      <div className="grid-container-roof">
        {buildingCords.map((image, index) => (
          <img
            key={index}
            src={imageMapping[image.src]}
            alt={`Image ${index + 1}`}
            onClick={() => {
              handleFog(index);
            }}
            style={{
              opacity: buildingCords[index].opacity,
              transform: `rotate(${image.angle}deg)`,
              position: "absolute",
              opacity: roofOpacityValues.find((item) => item.id === image.id).showing,
              left: `${
                (image.x * 4.1 + 4 - image.angle / 15 + image.xShift) *
                scaleFactor
              }vw`,
              top: `${(image.y * 4 - 4 + image.yShift) * scaleFactor}vw`,
              width: `${image.width * 4 * scaleFactor}vw`,
              height: `${image.height * 4 * scaleFactor}vw`,
            }}
          />
        ))}
      </div>
      {/* <button className="opactity-button" onClick={handleClick} text="Click Me" /> */}
    </div>
  );
};

export default RoofGrid;
