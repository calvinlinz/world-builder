import React from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { grid2 } from './TestGrids';

const BuildingsGrid = () => {
    const grid = grid2;

    const imageMapping = {
        0: allImages.transparent,
        1: allImages.transparent,
        2: allImages.buildingImages.building_2x3,
        3: allImages.buildingImages.building_3x3,
        4: allImages.buildingImages.building_4x6,
        5: allImages.buildingImages.building_5x5,
        6: allImages.buildingImages.building_6x3,
        7: allImages.buildingImages.building_6x8,
        8: allImages.transparent,
        9: allImages.buildingImages.building_2x2,
        10: allImages.transparent,
    };

    const buildingCodes = [2, 3, 4, 5, 6, 7, 9];

    const cordList = [];

    const renderRows = () => {
        let counter = 0;
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; i < grid[i].length; i++){
                if (buildingCodes.includes(grid[i][j])){
                    cordMap[0] = grid[i][j];
                }
            }
        }

    };

    return (
        <div className="grid-container">
            {/* Render your grid cells here */}
            {/* Overlay images using absolute positioning */}
            <div className="overlay-image image1" style={{ top: '100px', left: '200px' }} />
            <div className="overlay-image image2" style={{ top: '300px', left: '400px' }} />
        </div>
    );
};

export default BuildingsGrid;