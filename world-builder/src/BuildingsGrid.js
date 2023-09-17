import React, { useEffect } from "react";
import "./Grid.css";

import { allImages } from "./Constants";
import { getBuildingCords } from "./CalculatePositions";

const BuildingsGrid = ({ scaleFactor, worldData }) => {
  const buildingCords = getBuildingCords(worldData);

  const imageMapping = {
    5: allImages.buildingImages.building_2x2,
    6: allImages.buildingImages.building_2x3,
    7: allImages.buildingImages.building_3x3,
    8: allImages.buildingImages.building_4x4,
    9: allImages.buildingImages.building_4x6,
    10: allImages.buildingImages.building_5x5,
    11: allImages.buildingImages.building_6x3,
    12: allImages.buildingImages.building_6x8,
    13: allImages.buildingImages.building_7x8,
  };

  return (
    <div className="grid-container-buildings">
      {buildingCords.map((image, index) => (
        <img
          key={index}
          src={imageMapping[image.src]}
          alt={`Image ${index + 1}`}
          style={{
            transform: `rotate(${image.angle}deg)`,
            position: "absolute",
            left: `${
              (image.x * 4.1 + 4 - image.angle / 15 + image.xShift) * scaleFactor
            }vw`,
            top: `${(image.y * 4 - 4 + image.yShift) * scaleFactor}vw`,
            width: `${image.width * 4 * scaleFactor}vw`,
            height: `${image.height * 4 * scaleFactor}vw`,
          }}
        />
      ))}
    </div>
  );
};

export default BuildingsGrid;
