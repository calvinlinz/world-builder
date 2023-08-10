import React from 'react';
import './Grid.css';

import grass from './assets/forest/grass1.jpg';
import path from './assets/paths/path_light.jpg';
import floor from './assets/paths/path_dark.jpg';
import stone_floor from './assets/caves/floor_light.jpg';
import cave_floor from './assets/caves/floor_dark.jpg';
import bush from './assets/forest/bush1.png';
import rock from './assets/rocks/sml_rock1.png';
import water from './assets/water/water.jpg';
import tent from './assets/camp/2x2_tent_1.png';
import campfire from './assets/camp/campfire.png';

import { allImages } from './Constants';
import { grid2 } from './TestGrids';

const BackgroundGrid = () => {
    const grid = grid2;

    const imageMapping = {
        0: allImages.forestGrass.grass1,
        1: allImages.forestGrass.grass3,
    };


    return (
        <div className="grid-container-background">
            {/* Render the grid */}
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, columnIndex) => (
                <span key={columnIndex} className="grid-cell">
                    <img key={columnIndex} className="grid-cell" src={imageMapping[Math.floor(Math.random() * (2))]} alt={`Image ${cell}`} />
                </span>
                ))}
            </div>
            ))}
        </div>
    );
};

export default BackgroundGrid;