import React, {useEffect} from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { campCords } from './CalculatePositions';

const CampGrid = () => {

    const imageMapping = {
        19: allImages.campImages.tent_1x2,
        20: allImages.campImages2x2,
        21: allImages.campImages.campfire,
        22: allImages.campAccessory,
    };
    
    return (
        <div className="grid-container-camp">
            {campCords.map((image, index) => (
                <img
                    src={imageMapping[image.src]}
                    alt={`Image ${index + 1}`}
                    style={{
                        transform: `rotate(${image.angle}deg)`,
                        position: 'absolute',
                        left: `${image.x * 4 + 10 - (image.angle/15) + image.xShift}vw`,
                        top: `${image.y * 4  + image.yShift}vw`,
                        width: `${image.width * 4}vw`,
                        height: `${image.height * 4}vw`,
                    }}
                />
            ))}
        </div>
    );    
};

export default CampGrid;