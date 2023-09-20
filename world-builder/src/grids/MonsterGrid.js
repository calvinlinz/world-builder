import React from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { getMonsterCords } from './CalculatePositions';

const MonsterGrid = ({worldData, scaleFactor}) => {
    const grid = worldData;
    const monsterCords = getMonsterCords(worldData);

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
        2: allImages.monsterImages.skeleton,
        3: allImages.monsterImages.skeleton,
        4: allImages.monsterImages.skeleton,
    };

    const monsterImageMaps = [houseMonsters, caveMonsters, forestMonsters];

    const allMonsterImages = monsterCords.map((image, index) => {
        const imageStyle = {
          position: 'absolute',
          left: `${(image.x * 4 + 10) * scaleFactor}vw`,
          top: `${image.y * 4 * scaleFactor}vw`,
          width: `${4 * scaleFactor}vw`,
          height: `${4 * scaleFactor}vw`,
        };
        return (
          <img
            key={index}
            src={monsterImageMaps[image.environment][image.rank]}
            alt={`Monster Image ${index}`}
            style={imageStyle}
          />
        );
      });

    return (
        <div className="grid-container-monsters">
            {allMonsterImages}
        </div>
    );
};

export default MonsterGrid;