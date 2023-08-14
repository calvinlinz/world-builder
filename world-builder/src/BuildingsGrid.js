import React, {useEffect} from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { grid2 } from './TestGrids';
import { buildingCords } from './CalculatePositions';

const BuildingsGrid = () => {
    const grid = grid2;

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

export default BuildingsGrid;