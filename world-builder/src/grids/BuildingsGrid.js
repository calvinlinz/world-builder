import React, { useEffect ,memo} from "react";
import "./Grid.css";

import { allImages } from "./Constants";
import { WorldDataContext } from "../context/worldDataContext";


const BuildingsGrid = memo(function BuildingsGrid ({ scaleFactor, buildingCords, worldData}){

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

  const topFurnitureMapping = {
    5: allImages.transparent,
    6: allImages.transparent,
    7: allImages.furnitureImages.furniture_3x3_1,
    8: allImages.furnitureImages.furniture_4x4_1,
    9: allImages.furnitureImages.furniture_4x6_1,
    10: allImages.furnitureImages.furniture_5x5_1,
    11: allImages.furnitureImages.furniture_6x3_1,
    12: allImages.furnitureImages.furniture_6x8_1,
    13: allImages.furnitureImages.furniture_7x8_1,
  };

  const bottomFurnitureMapping = {
    5: allImages.transparent,
    6: allImages.transparent,
    7: allImages.furnitureImages.furniture_3x3_2,
    8: allImages.furnitureImages.furniture_4x4_2,
    9: allImages.furnitureImages.furniture_4x6_2,
    10: allImages.furnitureImages.furniture_5x5_2,
    11: allImages.furnitureImages.furniture_6x3_2,
    12: allImages.furnitureImages.furniture_6x8_2,
    13: allImages.furnitureImages.furniture_7x8_2,
  };

  return (
    <div>
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

      <div className="grid-container-furniture">
        {buildingCords.map((image, index) => (
          <img
            key={index}
            src={image.y > worldData.length/2 ? topFurnitureMapping[image.src] : bottomFurnitureMapping[image.src]}
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

    </div>
    
  );
});

export default BuildingsGrid;
