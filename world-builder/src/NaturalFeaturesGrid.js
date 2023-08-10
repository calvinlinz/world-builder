import React from 'react';
import './Grid.css';

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

const NaturalFeaturesGrid = () => {
    const grid = grid2;

    const renderRows = () => {

        for (let i = 0; i < grid.length; i++){
            for (let j = 0; i < grid[i].length; i++){

            }
        }

    };

    const imageMapping = {
        0: allImages.transparent,
        1: allImages.transparent,
        2: path,
        3: floor,
        4: stone_floor,
        5: cave_floor,
        6: bush,
        7: rock,
        8: water,
        9: tent,
        10: campfire,
    };


    return (
        <div className="grid-container-test">
            {/* Render the grid */}
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, columnIndex) => (
                <span key={columnIndex} className="grid-cell">
                    <img key={columnIndex} className="grid-cell" src={imageMapping[cell]} alt={`Image ${cell}`} />
                </span>
                ))}
            </div>
            ))}
        </div>
    );
};

export default NaturalFeaturesGrid;