import "./Grid.css";
import { allImages } from "./Constants";
import { getCaveCords } from "./CalculatePositions";
import { useContext ,useEffect,useState} from "react";
import { WorldDataContext } from "../context/worldDataContext";


const CaveGrid = ({ scaleFactor }) => {
  const {caveCords} = useContext(WorldDataContext);
  const imageMapping = {
    15: allImages.caveImages.sml_cave,
    16: allImages.caveImages.lrg_cave_2,
    17: allImages.caveImages.lrg_cave_1,
    18: allImages.caveImages.massive_cave,
  };

  return (
    <div className="grid-container-caves">
      {caveCords.map((image, index) => (
        <img
          key={index}
          src={imageMapping[image.src]}
          alt={`Image ${index + 1}`}
          style={{
            transform: `rotate(${image.angle}deg)`,
            position: "absolute",
            left: `${(image.x * 4 + 6 - image.angle / 15) * scaleFactor}vw`,
            top: `${image.y * 4 * scaleFactor - 2 + 2}vw`,
            width: `${image.width * 4 * scaleFactor}vw`,
            height: `${image.height * 4 * scaleFactor}vw`,
          }}
        />
      ))}
    </div>
  );
};

export default CaveGrid;
