import React from 'react';
import './Grid.css';
import { allImages } from './Constants';

const PathGrid = ({scaleFactor, worldData}) => {
    const grid = worldData;

    return (
        <div className="grid-container-path">
            {/* Render the grid */}
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, columnIndex) => (
                <span key={columnIndex} className="grid-cell">
                    {cell == 40 ? <img key={columnIndex} className="grid-cell" src={allImages.pathImages.path_light} alt={`Image ${cell}`} /> : <img key={columnIndex} className="grid-cell" src={allImages.transparent} alt={`Image ${cell}`} />}
                </span>
                ))}
            </div>
            ))}
        </div>
    );


};

export default PathGrid;