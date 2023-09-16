import React from 'react';
import './Grid.css';
import { allImages } from './Constants';

const MonsterGrid = ({worldData}) => {
    const grid = worldData;

    const houseMonsters = {
        1: allImages.houseMonsterImages.house1,
        2: allImages.houseMonsterImages.house2,
        3: allImages.houseMonsterImages.house3,
        4: allImages.houseMonsterImages.house4,
    };

    const forestMonsters = {
        1: allImages.monsterImages.cat,
        2: allImages.monsterImages.fairy,
        3: allImages.monsterImages.monkey,
        4: allImages.monsterImages.snake,
    };

    const caveMonsters = {
        1: allImages.monsterImages.skeleton,
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

export default MonsterGrid;