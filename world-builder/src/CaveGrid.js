import './Grid.css';
import { allImages } from './Constants';
import { caveCords } from './CalculatePositions';

const CaveGrid = () => {
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
                    src={imageMapping[image.src]}
                    alt={`Image ${index + 1}`}
                    style={{
                        transform: `rotate(${image.angle}deg)`,
                        position: 'absolute',
                        left: `${(image.x * 4 + 10 - (image.angle/15)) * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))}vw`,
                        top: `${image.y * 4 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))}vw`,
                        width: `${image.width * 4 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))}vw`,
                        height: `${image.height * 4 * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale-factor'))}vw`,
                    }}
                />
            ))}
        </div>
    );    
};

export default CaveGrid;