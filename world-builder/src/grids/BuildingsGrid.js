import React, { useEffect ,useContext} from "react";
import "./Grid.css";

import { allImages } from "./Constants";
import { getBuildingCords } from "./CalculatePositions";
import { WorldDataContext } from "../context/worldDataContext";


const BuildingsGrid = ({ scaleFactor}) => {
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

  const furniture3x3Map = {
    0: allImages.furnitureImages.furniture_3x3_1,
    1: allImages.furnitureImages.furniture_3x3_2,
  };

  const furniture4x4Map = {
    0: allImages.furnitureImages.furniture_4x4_1,
    1: allImages.furnitureImages.furniture_4x4_2,
  };

  const furniture4x6Map = {
    0: allImages.furnitureImages.furniture_4x6_1,
    1: allImages.furnitureImages.furniture_4x6_2,
  };

  const furniture5x5Map = {
    0: allImages.furnitureImages.furniture_5x5_1,
    1: allImages.furnitureImages.furniture_5x5_2,
  };

  const furniture6x3Map = {
    0: allImages.furnitureImages.furniture_6x3_1,
    1: allImages.furnitureImages.furniture_6x3_2,
  };

  const furniture6x8Map = {
    0: allImages.furnitureImages.furniture_6x8_1,
    1: allImages.furnitureImages.furniture_6x8_2,
  };

  const furniture7x8Map = {
    0: allImages.furnitureImages.furniture_7x8_1,
    1: allImages.furnitureImages.furniture_7x8_2,
  }



  const furnitureMapping = {
    5: allImages.transparent,
    6: allImages.transparent,
    7: furniture3x3Map[Math.floor(Math.random() * 2)],
    8: furniture4x4Map[Math.floor(Math.random() * 2)],
    9: furniture4x6Map[Math.floor(Math.random() * 2)],
    10: furniture5x5Map[Math.floor(Math.random() * 2)],
    11: furniture6x3Map[Math.floor(Math.random() * 2)],
    12: furniture6x8Map[Math.floor(Math.random() * 2)],
    13: furniture7x8Map[Math.floor(Math.random() * 2)],
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
            src={furnitureMapping[image.src]}
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
};

export default BuildingsGrid;
