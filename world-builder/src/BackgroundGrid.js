import React from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { grid2, grid6 } from './TestGrids';

const BackgroundGrid = ({worldData}) => {
    const grid = worldData;

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