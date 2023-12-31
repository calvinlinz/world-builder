import React, {memo} from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { getCampCords } from './CalculatePositions';

const CampGrid = memo(function CampGrid({scaleFactor, worldData}){
    const campCords = getCampCords(worldData);

    const imageMapping = {
        19: allImages.campImages.tent_1x2,
        20: allImages.campImages2x2.tent_2x2_2,
        21: allImages.campImages.campfire,
        22: allImages.campAccessory.bedroll,
        23: allImages.campImages2x2.tent_2x2_1,
        24: allImages.campImages.campsite1,
        25: allImages.campImages.campsite2,
        26: allImages.campImages.campsite3,
        27: allImages.campImages.campsite4,
        28: allImages.campImages.campsite5,
        29: allImages.campImages.campsite6,
        30: allImages.campImages.campsite7,
    };
    
    return (
        <div className="grid-container-camp">
            {campCords.map((image, index) => (
                <img
                    key={index} 
                    src={imageMapping[image.src]}
                    alt={`Image ${index + 1}`}
                    style={{
                        transform: `rotate(${image.angle}deg)`,
                        position: 'absolute',
                        left: `${(image.x * 4.1 + 4 - (image.angle/15)) * scaleFactor}vw`,
                        top: `${image.y * 3.9 * scaleFactor + 0.1}vw`,
                        width: `${image.width * 4 * scaleFactor}vw`,
                        height: `${image.height * 4 * scaleFactor}vw`,
                    }}
                />
            ))}
        </div>
    );    
});

export default CampGrid;