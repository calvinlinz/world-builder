import "./Grid.css";
import { allImages } from "./Constants";
import { getCaveCords } from "./CalculatePositions";
import { useContext ,useEffect,useState} from "react";
import { WorldDataContext } from "../context/worldDataContext";

const CaveCoverGrid = () => {
  const { worldData,caveCords,setCaveCords,buildingCords,currentPlayersInGame,sendMessage,host, caveOpacity} = useContext(WorldDataContext);


  const imageMapping = {
    15: allImages.caveCoverImages.sml_cave_cover,
    16: allImages.caveCoverImages.lrg_cave_2_cover,
    17: allImages.caveCoverImages.lrg_cave_1_cover,
    18: allImages.caveCoverImages.massive_cave_cover,
  };


  let scaleFactor = 0.25;

  const handleFog = (index) => {
    if(host){
      console.log(caveCords.opacity);
      const newCaves = [...caveCords];
          newCaves[index] = {
        ...newCaves[index],
        opacity: newCaves[index].opacity === 1 ? 0 : 1,
        
      };
      console.log(newCaves.opacity);
  
  
      setCaveCords(newCaves);
      sendMessage(
        worldData,
        buildingCords,
        newCaves,
        currentPlayersInGame,
        window.scrollX,
        window.scrollY
      );
    }
  
  };


  return (
    <div className="grid-container-caves-cover" style={{opacity: caveOpacity}}>
      {caveCords.map((image, index) => (
        <img
          key={index}
          src={imageMapping[image.src]}
          alt={`Image ${index + 1}`}
          onClick={()=>handleFog(index)}
          style={{
            opacity: caveCords[index].opacity,
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

export default CaveCoverGrid;