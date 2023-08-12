import { allImages } from './Constants';
import { grid2 } from './TestGrids';

const grid = grid2;

const imageCodes = {
    0: allImages.forestGrass,
    1: allImages.forestBushGreen,
    2: allImages.forestTree,
    3: allImages.rockImages1x1,
    4: allImages.rockImagesClstr,
    5: allImages.buildingImages.building_2x2,
    6: allImages.buildingImages.building_2x3,
    7: allImages.buildingImages.building_3x3,
    8: allImages.buildingImages.building_4x4,
    9: allImages.buildingImages.building_4x6,
    10: allImages.buildingImages.building_5x5,
    11: allImages.buildingImages.building_6x3,
    12: allImages.buildingImages.building_6x8,
    13: allImages.buildingImages.building_7x8,
}

// -- FUNCTIONS FOR CALCULATING ARRAYS ------------------------------------------------------------
// ------------------------------------------------------------------------------------------------


// Calculate the cords for all of the tree images
function getTreeCords(){
    const tempArray = [];
    for (let i = 0; i < grid.length - 1; i++){
        for (let j = 0; j < grid[i].length - 1; j++){
            // If it is a tree
            if(grid[i][j] === 2){
                // If it is the top left corner of the tree
                if(grid[i][j + 1] === 2 && grid[i + 1][j] === 2 &&grid[i + 1][j + 1] === 2){
                    const row = [j,i];
                    tempArray.push(row);
                }
            }
        }
    }
    return tempArray;
};

// Calculate the cords and orientation of all of the cluster rocks
function getClstrRockCords(){
    const tempArray = [];
    for (let i = 0; i < grid.length - 1; i++){
        for (let j = 0; j < grid[i].length - 1; j++){
            // If it is a clstr rock
            if(grid[i][j] === 4){
                // if the clstr rock is at 0 degrees i.e. horizontal
                if(grid[i][j + 1] === 4){
                    const row = [j,i,0];
                    tempArray.push(row);
                }else if(grid[i + 1][j] === 4){
                    const row = [j,i,90];
                    tempArray.push(row);
                }
            }
        }
    }
    return tempArray;
};

// -- BUILDING FUNCS -----------------------------------------------------------------------------

const imageDims = [[], [], [], [], [], [2, 2], [2, 3], [3, 3], [4, 4], [4, 6], 
[5, 5], [6, 3], [6, 8], [7, 8]];

const imageShift = [[], [], [], [], [], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], 
[0, 0], [0, 6], [10, -4], [0, 0]];

const buildingCodes = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const symetricalCodes = [5, 7, 8, 10];


 // Will return the degree that the building is orientated at 
function findOrientation (startY, startX, value){
    const width = imageDims[value][0];
    const widthCheck = grid[startY][startX + width];
    console.log(widthCheck);
    if (widthCheck === value){
        if (value ===  grid[startY][startX + width + 1]){
            const newValue = {
                src: value,
                x: startX,
                y: startY,
                width: imageDims[value][0],
                height: imageDims[value][1],
                angle: 90,
                xShift: imageShift[value][0],
                yShift: imageShift[value][1], 
              };
            return newValue;
        }else{
            const newValue = {
                src: value,
                x: startX,
                y: startY,
                width: imageDims[value][0],
                height: imageDims[value][1],
                angle: 0,
                xShift: imageShift[value][0],
                yShift: imageShift[value][1], 
              };
            return newValue;
        }
        
    }
    const newValue = {
        src: value,
        x: startX,
        y: startY,
        width: imageDims[value][0],
        height: imageDims[value][1],
        angle: 90,
        xShift: imageShift[value][0],
        yShift: imageShift[value][1], 
      };
    return newValue;
};

// Find the locations and types of buildings inside the map
function getBuildingCords (){
    const cordList = [];

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (buildingCodes.includes(grid[i][j])){
                if (symetricalCodes.includes(grid[i][j])){
                    // Ensure that the buildings location is only recorded once
                    if(i === 0 && j === 0){ // If y = 0 and x = 0
                        const newValue = {
                            src: grid[i][j],
                            x: j,
                            y: i,
                            width: imageDims[grid[i][j]][0],
                            height: imageDims[grid[i][j]][0],
                            angle: 0,
                            xShift: imageShift[grid[i][j]][0],
                            yShift: imageShift[grid[i][j]][1], 
                        };
                        cordList.push(newValue);
                    }else if(i === 0){ // If y = 0
                        if(grid[i][j] != grid[i][j - 1]){
                            const newValue = {
                                src: grid[i][j],
                                x: j,
                                y: i,
                                width: imageDims[grid[i][j]][0],
                                height: imageDims[grid[i][j]][0],
                                angle: 0,
                                xShift: imageShift[grid[i][j]][0],
                                yShift: imageShift[grid[i][j]][1], 
                            };
                            cordList.push(newValue);
                        }
                    }else if(j === 0){ // If x = 0 
                        if(grid[i][j] != grid[i - 1][j]){
                            const newValue = {
                                src: grid[i][j],
                                x: j,
                                y: i,
                                width: imageDims[grid[i][j]][0],
                                height: imageDims[grid[i][j]][0],
                                angle: 0,
                                xShift: imageShift[grid[i][j]][0],
                                yShift: imageShift[grid[i][j]][1], 
                            };
                            cordList.push(newValue);
                        }
                    }else{ 
                        if(grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]){
                            const newValue = {
                                src: grid[i][j],
                                x: j,
                                y: i,
                                width: imageDims[grid[i][j]][0],
                                height: imageDims[grid[i][j]][0],
                                angle: 0,
                                xShift: imageShift[grid[i][j]][0],
                                yShift: imageShift[grid[i][j]][1], 
                            };
                            cordList.push(newValue);
                        }
                    }  
                }else{
                    // Ensure that the buildings location is only recorded once
                    if(i === 0 && j === 0){
                        cordList.push(findOrientation(i, j, grid[i][j]));
                    }else if(i === 0){ // If y = 0
                        if(grid[i][j] != grid[i][j - 1]){
                            cordList.push(findOrientation(i, j, grid[i][j]));
                        }
                    }else if(j === 0){ // If x = 0 
                        if(grid[i][j] != grid[i - 1][j]){
                            cordList.push(findOrientation(i, j, grid[i][j]));
                        }
                    }else{ 
                        if(grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]){
                            cordList.push(findOrientation(i, j, grid[i][j]));
                        }
                    }
                }
            }
        }
    }
    console.log(cordList);
    return cordList;
};




// -- IMAGE ARRAYS --------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

const treeCords = getTreeCords();
const clstrRockCords = getClstrRockCords();
const buildingCords = getBuildingCords();


export{
    imageCodes,
    treeCords,
    clstrRockCords,
    buildingCords,
};