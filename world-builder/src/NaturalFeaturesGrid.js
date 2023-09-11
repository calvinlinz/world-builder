import React from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { getTreeCords, getClstrRockCords } from './CalculatePositions';

const NaturalFeaturesGrid = ({scaleFactor, worldData}) => {
    const grid = worldData;
    const treeCords = getTreeCords(worldData);
    const clstrRockCords = getClstrRockCords(worldData);

    const naturalCodes = [1, 3];

    const imageMapping = {
        0: allImages.transparent,
        1: allImages.forestBushGreen,
        2: allImages.forestTree,
        3: allImages.rockImages1x1,
        4: allImages.rockImagesClstr,
    };

    // For image rotation - CURRENTLY TURNS THEM ALL THE SAME ANGLE NO GOOD! ------------------------
    const rotationAngle = Math.floor(Math.random() * 120); 

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        width: `90%`,
        height: `90%`,

    };

    // --------------------------------------------------------------------------------------------------

    // Display all of the tree images correctly
    const treeImages = treeCords.map((image, index) => {
        const rotationAngle = Math.floor(Math.random() * 360);
        const imageStyle = {
          transform: `rotate(${rotationAngle}deg)`,
          position: 'absolute',
          left: `${(image[0] * 4 + 10) * scaleFactor}vw`,
          top: `${image[1] * 4 * scaleFactor}vw`,
          width: `${8 * scaleFactor}vw`,
          height: `${8 * scaleFactor}vw`,
        };
        return (
          <img
            key={index}
            src={imageMapping[2][Math.floor(Math.random() * 4)]}
            alt={`Rotated Image ${index}`}
            style={imageStyle}
          />
        );
      });

    // Display all of the cluster rocks correctly
    const rockClstrImages = clstrRockCords.map((image, index) => {
        const imageStyle = {
          transform: `rotate(${image[2]}deg)`,
          position: 'absolute',
          left: `${(image[0] * 4 + 10 - (image[2]/50)) * scaleFactor}vw`,
          top: `${(image[1] * 4 + (image[2]/50)) * scaleFactor}vw`,
          width: `${8 * scaleFactor}vw`,
          height: `${4 * scaleFactor}vw`,
        };
        return (
          <img
            key={index}
            src={imageMapping[4][Math.floor(Math.random() * 3)]}
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
                    {naturalCodes.includes(cell) ? <img style={imageStyle} key={columnIndex} className="grid-cell" src={imageMapping[cell][Math.floor(Math.random() * 3)]} alt={`Image ${cell}`} /> : <img key={columnIndex} className="grid-cell" src={imageMapping[0]} alt={`Image ${cell}`} />}
                </span>
                ))}
            </div>
            ))}
            {treeImages}
            {rockClstrImages}
        </div>
    );
};

export default NaturalFeaturesGrid;