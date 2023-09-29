import { React, useContext,memo} from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { WorldDataContext } from '../context/worldDataContext';

const BackgroundGrid  = memo(function BackgroundGrid({worldData, frameValue}){
    const grid = worldData;
    const imageMapping = {
        0: allImages.forestGrass.grass1,
        1: allImages.forestGrass.grass3,
    };

    return (
        <div className={frameValue ? "grid-container-background-stretched" : "grid-container-background"}>
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
});

export default BackgroundGrid;