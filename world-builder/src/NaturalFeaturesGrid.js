import React from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { grid2 } from './TestGrids';

const NaturalFeaturesGrid = () => {
    const grid = grid2;

    const imageMapping = {
        0: allImages.transparent,
        1: allImages.forestBushGreen.bush1,
        2: allImages.forestTree.tree1,
        3: allImages.rockImages1x1.lrg_rock2,
        4: allImages.rockImagesClstr,
    };

    const naturalCodes = [1, 2, 3, 4];

    return (
        <div className="grid-container-natural">
            {/* Render the grid */}
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, columnIndex) => (
                <span key={columnIndex} className="grid-cell">
                    {naturalCodes.includes(cell) ? <img key={columnIndex} className="grid-cell" src={imageMapping[cell]} alt={`Image ${cell}`} /> : <img key={columnIndex} className="grid-cell" src={imageMapping[0]} alt={`Image ${cell}`} />}
                </span>
                ))}
            </div>
            ))}
        </div>
    );
};

export default NaturalFeaturesGrid;