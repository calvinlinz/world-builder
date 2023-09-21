import "./Grid.css";
import { allImages } from "./Constants";
import { getCaveCords } from "./CalculatePositions";

const CaveCoverGrid = ({ scaleFactor, worldData, caveOpacityValue}) => {
  const caveCords = getCaveCords(worldData);
  const imageMapping = {
    15: allImages.caveCoverImages.sml_cave_cover,
    16: allImages.caveCoverImages.lrg_cave_2_cover,
    17: allImages.caveCoverImages.lrg_cave_1_cover,
    18: allImages.caveCoverImages.massive_cave_cover,
  };

  return (
    <div className="grid-container-caves-cover" style={{ opacity: caveOpacityValue }}>
      {caveCords.map((image, index) => (
        <img
          key={index}
          src={imageMapping[image.src]}
          alt={`Image ${index + 1}`}
          style={{
            transform: `rotate(${image.angle}deg)`,
            position: "absolute",
            left: `${(image.x * 4 + 10 - image.angle / 15) * scaleFactor}vw`,
            top: `${image.y * 4 * scaleFactor - 2}vw`,
            width: `${image.width * 4 * scaleFactor}vw`,
            height: `${image.height * 4 * scaleFactor}vw`,
          }}
        />
      ))}
    </div>
  );
};

export default CaveCoverGrid;
