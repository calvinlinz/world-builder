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

    const naturalCodes = [1, 3, 4];


    // For image rotation - CURRENTLY TURNS THEM ALL THE SAME ANGLE NO GOOD!
    const rotationAngle = Math.floor(Math.random() * 120); 

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
    };

    const treeCords = [[0,1], [10, 5], [8, 10], [7, 18]];

    const treeImages = treeCords.map((image, index) => {
        const rotationAngle = Math.floor(Math.random() * 360);
        const imageStyle = {
          transform: `rotate(${rotationAngle}deg)`,
          position: 'absolute',
          left: `${image[0] * 4 + 10}vw`,
          top: `${image[1] * 4}vw`,
          width: `${8}vw`,
          height: `${8}vw`,
        };
    
        return (
          <img
            key={index}
            src={imageMapping[2]}
            alt={`Rotated Image ${index}`}
            style={imageStyle}
          />
        );
      });

    return (
        <div className="grid-container-natural">
            {/* Render the grid */}
            {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
                {row.map((cell, columnIndex) => (
                <span key={columnIndex} className="grid-cell">
                    {naturalCodes.includes(cell) ? <img style={imageStyle} key={columnIndex} className="grid-cell" src={imageMapping[cell]} alt={`Image ${cell}`} /> : <img key={columnIndex} className="grid-cell" src={imageMapping[0]} alt={`Image ${cell}`} />}
                </span>
                ))}
            </div>
            ))}
            {treeImages}
        </div>
    );
};

export default NaturalFeaturesGrid;