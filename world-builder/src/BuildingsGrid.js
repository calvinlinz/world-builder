import React, {useEffect} from 'react';
import './Grid.css';

import { allImages } from './Constants';
import { grid2 } from './TestGrids';

const BuildingsGrid = () => {
    const grid = grid2;

    const imageMapping = {
        5: allImages.buildingImages.building_2x2,
        6: allImages.buildingImages.building_2x3,
        7: allImages.buildingImages.building_3x3,
        8: allImages.buildingImages.building_4x4,
        9: allImages.buildingImages.building_4x6,
        10: allImages.buildingImages.building_5x5,
        11: allImages.buildingImages.building_6x3,
        12: allImages.buildingImages.building_6x8,
        13: allImages.buildingImages.building_7x8,
    };

    const imageDims = [[], [], [], [], [], [2, 2], [2, 3], [3, 3], [4, 4], [4, 6], 
                        [5, 5], [6, 3], [6, 8], [7, 8]];

    const buildingCodes = [5, 6, 7, 8, 9, 10, 11, 12, 13];
    const symetricalCodes = [5, 7, 8, 10];

    const cordList = [
        {
            src: 9,
            x: 10,
            y: 10,
            width: 5,
            height: 5,
        },
        {
            src: 7,
            x: 2,
            y: 2,
            width: 3,
            height: 3,
        },
        {
            src: 6,
            x: 15,
            y: 4,
            width: 2,
            height: 3,
        }
    ];

    // Will return the degree that the building is orientated at 
    function findOrientation (startX, startY, value){
        const width = imageDims[value][0];
        const widthCheck = grid[startY][startX + width];

        if (widthCheck === value){
            const newValue = {
                src: value,
                x: startX,
                y: startY,
                width: imageDims[value][0],
                height: imageDims[value][1],
              };
            return newValue;
        }
        const newValue = {
            src: value,
            x: startX,
            y: startY,
            width: imageDims[value][1],
            height: imageDims[value][0],
          };
        return newValue;
    };


    function renderRows (){
        for (let i = 0; i < grid.length; i++){
            for (let j = 0; j < grid[i].length; j++){
                if (buildingCodes.includes(grid[i][j])){
                    if (symetricalCodes.includes(grid[i][j])){
                        const newValue = {
                            src: grid[i][j],
                            x: i,
                            y: j,
                            width: imageDims[grid[i][j]][0],
                            height: imageDims[grid[i][j]][0],
                          };
                        cordList.push(newValue);
                    }else{
                        cordList.push(findOrientation(i, j, grid[i][j]));
                    }
                }
            }
        }
    };

    useEffect(() => {
        renderRows();
      }, []);
    
    
    return (
        <div className="grid-container-buildings">
            {cordList.map((image, index) => (
                <img
                    src={imageMapping[image.src]}
                    alt={`Image ${index + 1}`}
                    style={{
                        position: 'absolute',
                        left: `${image.x * 4 + 10}vw`,
                        top: `${image.y * 4}vw`,
                        width: `${image.width * 4}vw`,
                        height: `${image.height * 4}vw`,
                    }}
                />
            ))}
        </div>
    );

    
};

export default BuildingsGrid;