import { allImages } from './Constants';
import { grid2, grid3, grid4, grid5, grid6 } from './TestGrids';

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
    14: allImages.pathImages,
    15: allImages.caveImages.sml_cave,
    16: allImages.caveImages.lrg_cave_2,
    17: allImages.caveImages.lrg_cave_1,
    18: allImages.caveImages.massive_cave,
}

// -- FUNCTIONS FOR CALCULATING ARRAYS ------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// Calculate the cords for all of the tree images
function getTreeCords(grid) {
    const tempArray = [];
    for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[i].length - 1; j++) {
            // If it is a tree
            if (grid[i][j] === 2) {
                // If it is the top left corner of the tree
                if (grid[i][j + 1] === 2 && grid[i + 1][j] === 2 && grid[i + 1][j + 1] === 2) {
                    const row = [j, i];
                    tempArray.push(row);
                }
            }
        }
    }
    // console.log("temparray: " + tempArray);
    return tempArray;
};

// Calculate the cords and orientation of all of the cluster rocks
function getClstrRockCords(grid) {
    const tempArray = [];
    for (let i = 0; i < grid.length - 1; i++) {
        for (let j = 0; j < grid[i].length - 1; j++) {
            // If it is a clstr rock
            if (grid[i][j] === 4) {
                // if the clstr rock is at 0 degrees i.e. horizontal
                if (grid[i][j + 1] === 4) {
                    const row = [j, i, 0];
                    tempArray.push(row);
                } else if (grid[i + 1][j] === 4) {
                    const row = [j, i, 90];
                    tempArray.push(row);
                }
            }
        }
    }
    return tempArray;
};

// -- BUILDING FUNCS -----------------------------------------------------------------------------

const imageDims = [
    [],
    [],
    [],
    [],
    [],
    [2, 2],
    [2, 3],
    [3, 3],
    [4, 4],
    [4, 6],
    [5, 5],
    [6, 3],
    [6, 8],
    [7, 8]
];

const imageShift = [
    [],
    [],
    [],
    [],
    [],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 6],
    [10, -4],
    [0, 0]
];

const buildingCodes = [5, 6, 7, 8, 9, 10, 11, 12, 13];
const symetricalCodes = [5, 7, 8, 10];


// Will return the degree that the building is orientated at 
function findOrientation(startY, startX, value, grid) {
    const width = imageDims[value][0];
    console.log(grid[startY][startX]);
    const widthCheck = grid[startY][startX + width];
    if (widthCheck === value) {
        if (value === grid[startY][startX + width + 1]) {
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
        } else {
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
function getBuildingCords(grid) {
    // console.log("Building Cords: " + grid);
    const cordList = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (buildingCodes.includes(grid[i][j])) {
                if(!buildingCodes.includes(grid[i-1][j])){
                    if(!buildingCodes.includes(grid[i][j-1])){
                        if (symetricalCodes.includes(grid[i][j])) {
                            // Ensure that the buildings location is only recorded once
                            if (i === 0 && j === 0) { // If y = 0 and x = 0
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
                            } else if (i === 0) { // If y = 0
                                if (grid[i][j] != grid[i][j - 1]) {
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
                            } else if (j === 0) { // If x = 0 
                                if (grid[i][j] != grid[i - 1][j]) {
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
                            } else {
                                if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
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
                        } else {
                            // Ensure that the buildings location is only recorded once
                            if (i === 0 && j === 0) {
                                cordList.push(findOrientation(i, j, grid[i][j], grid));
                            } else if (i === 0) { // If y = 0
                                if (grid[i][j] != grid[i][j - 1]) {
                                    cordList.push(findOrientation(i, j, grid[i][j], grid));
                                }
                            } else if (j === 0) { // If x = 0 
                                if (grid[i][j] != grid[i - 1][j]) {
                                    cordList.push(findOrientation(i, j, grid[i][j], grid));
                                }
                            } else {
                                if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
                                    cordList.push(findOrientation(i, j, grid[i][j], grid));
                                }
                            }
                        }
                }
                }
            }
        }
    }
    return cordList;
};

// -- CAVE FUNCS -----------------------------------------------------------------------------

const caveKeys = [15, 16, 17, 18];
const caveDims = [
    [5, 5],
    [7, 7],
    [9, 8],
    [16, 14]
];

const caveFuncs = [getSmallCaveCords, getMedCaveCords, getLargeCaveCords, getMassiveCaveCords];

// Get the location and orientation of the small caves 
function getSmallCaveCords(startY, startX, gridCopy) {
    let angle = 0;
    const newValue = {
        src: 15,
        x: startX,
        y: startY,
        width: caveDims[0][0],
        height: caveDims[0][1],
        angle: angle,
    };

    return newValue;
}

// Get the location and orientation of the medium caves 
function getMedCaveCords(startY, startX, gridCopy) {
    let angle = 0;
    const newValue = {
        src: 16,
        x: startX,
        y: startY,
        width: caveDims[1][0],
        height: caveDims[1][1],
        angle: angle,
    };

    return newValue;
}

// Get the location and orientation of the large caves 
function getLargeCaveCords(startY, startX, gridCopy) {
    let angle = 0;
    const width = caveDims[2][0];
    const widthCheck = gridCopy[startY][startX + width];

    if (widthCheck === 17) {
        if (17 === gridCopy[startY][startX + width + 1]) {
            const newValue = {
                src: 17,
                x: startX,
                y: startY,
                width: imageDims[2][0],
                height: imageDims[2][1],
                angle: 90,
            };
            return newValue;
        } else {
            const newValue = {
                src: 17,
                x: startX,
                y: startY,
                width: imageDims[2][0],
                height: imageDims[2][1],
                angle: 0,
            };
            return newValue;
        }

    }
    const newValue = {
        src: 17,
        x: startX,
        y: startY,
        width: caveDims[2][0],
        height: caveDims[2][1],
        angle: angle,
    };

    return newValue;
}

// Get the location and orientation of the massive caves 
function getMassiveCaveCords(startY, startX, gridCopy) {
    let angle = 0;
    const width = caveDims[3][0];
    const widthCheck = gridCopy[startY][startX + width];

    if (widthCheck === 18) {
        if (18 === gridCopy[startY][startX + width + 1]) {
            const newValue = {
                src: 18,
                x: startX,
                y: startY,
                width: imageDims[3][0],
                height: imageDims[3][1],
                angle: 90,
            };
            return newValue;
        } else {
            const newValue = {
                src: 18,
                x: startX,
                y: startY,
                width: imageDims[3][0],
                height: imageDims[3][1],
                angle: 0,
            };
            return newValue;
        }

    }

    const newValue = {
        src: 18,
        x: startX,
        y: startY,
        width: caveDims[3][0],
        height: caveDims[3][1],
        angle: angle,
    };

    return newValue;
}

// Get the cords, types and angles of all of the caves on the map
function getCaveCords(grid) {
    const cordList = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (caveKeys.includes(grid[i][j])) {
                if (grid[i][j] === 15) {
                    if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
                        cordList.push(getSmallCaveCords(i, j, grid));
                    }
                } else if (grid[i][j] === 16) {
                    if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
                        cordList.push(getMedCaveCords(i, j, grid));
                    }
                } else if (grid[i][j] === 17) {
                    if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
                        cordList.push(getLargeCaveCords(i, j, grid));
                    }        
                } else if (grid[i][j] === 18) {
                    if (grid[i][j] != grid[i - 1][j] && grid[i][j] != grid[i][j - 1]) {
                        cordList.push(getMassiveCaveCords(i, j, grid))
                    }
                }
            }
        }
    }
    return cordList;
}

// -- CAMP FUNCS ----------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

const campKeys = [19, 20, 21, 22, 23];
const campDims = [
    [1, 2],
    [2, 2],
    [1, 1],
    [1, 2],
    [3, 3]
];

function getSmallCampCords(i, j, grid) {
    if (grid[i][j + 1] === 19) {
        const newValue = {
            src: 19,
            x: j + 2,
            y: i - 0.5,
            width: campDims[0][0],
            height: campDims[0][1],
            angle: 90,
        };
        return newValue;
    } else if (grid[i + 1][j] === 19) {
        const newValue = {
            src: 19,
            x: j,
            y: i,
            width: campDims[0][0],
            height: campDims[0][1],
            angle: 0,
        };
        return newValue;
    }
}

function getCampAccessoryCords(i, j, grid) {
    if (grid[i][j + 1] === 22) {
        const newValue = {
            src: 22,
            x: j + 2,
            y: i - 0.5,
            width: campDims[3][0],
            height: campDims[3][1],
            angle: 90,
        };
        return newValue;
    } else if (grid[i + 1][j] === 22) {
        const newValue = {
            src: 22,
            x: j,
            y: i,
            width: campDims[3][1],
            height: campDims[3][0],
            angle: 0,
        };
        return newValue;
    }
}

// Get the cords, types and angles of all of the camp items on the map
function getCampCords(grid) {
    const cordList = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (campKeys.includes(grid[i][j])) {
                if (grid[i][j] === 21) { // It is a fireplace
                    const newValue = {
                        src: 21,
                        x: j,
                        y: i,
                        width: campDims[2][0],
                        height: campDims[2][1],
                        angle: 0,
                    };
                    cordList.push(newValue);
                } else if (grid[i][j] === 19) { // It is a small tent
                    cordList.push(getSmallCampCords(i, j, grid));
                } else if (grid[i][j] === 20) { // It is a med tent
                    // If it is the top left corner of the tent
                    if (grid[i][j + 1] === 20 && grid[i + 1][j] === 20 && grid[i + 1][j + 1] === 20) {
                        const newValue = {
                            src: 20,
                            x: j,
                            y: i,
                            width: campDims[1][0],
                            height: campDims[1][1],
                            angle: 0,
                        };
                        cordList.push(newValue);
                    }
                } else if (grid[i][j] === 22) { // It is accessory
                    cordList.push(getCampAccessoryCords(i, j, grid));
                } else if (grid[i][j] === 23) { // It is a large tent
                    if (grid[i][j + 1] === 23 && grid[i][j + 2] === 23 && grid[i + 1][j] === 23 && grid[i + 2][j] === 23) {
                        const newValue = {
                            src: 23,
                            x: j,
                            y: i,
                            width: campDims[4][0],
                            height: campDims[4][1],
                            angle: 0,
                        };
                        cordList.push(newValue);
                    }

                }
            }
        }
    }
    const filteredArray = cordList.filter(item => item !== undefined);
    return filteredArray;
}


// -- PATH FUNCS ----------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

const pathEdgeDims = [
    [1,1],
    [1,2],
    [1,3],
    [1,3],
];


function getPathEdges(grid){
    const cordList = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 40){ // it is a path

                // Check for a with x1 vertical straight path 
                if(grid[i+1][j] === 40 && grid[i-1][j] === 40){ // Above and below is a path
                    if(grid[i][j - 1] != 40 && grid[i][j + 1] != 40 && grid[i+1][j-1] != 40 && grid[i+1][j+1] != 40 && grid[i-1][j-1] != 40 && grid[i-1][j+1] != 40){ // No path on the sides 
                        // PUT 2 TEXTURES ON THE SIDE
                        const leftImgSrc = Math.floor(Math.random() * 4);
                        const rightImgSrc = Math.floor(Math.random() * 4);

                        const leftValue = {
                            src: leftImgSrc,
                            x: j,
                            y: i,
                            width: pathEdgeDims[leftImgSrc][0],
                            height: pathEdgeDims[leftImgSrc][1],
                            angle: 0,
                        };

                        const rightValue = {
                            src: rightImgSrc,
                            x: j + 1,
                            y: i,
                            width: pathEdgeDims[rightImgSrc][0],
                            height: pathEdgeDims[rightImgSrc][1],
                            angle: 0,
                            transform: `scaleX(-1)`,
                        };

                        cordList.push(leftValue);
                        cordList.push(rightValue);
                    }
                }

            }

        }
    }
    console.log(cordList);
    return cordList;
}

function getWideVerticalPathEdges(grid){
    const cordList = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 40){ // it is a path
                // Check for a with x2 vertical stragight path
                if(grid[i][j+1] === 40 && grid[i][j+2] != 40){
                    if(grid[i+1][j] === 40 && grid[i-1][j] === 40 && grid[i+1][j+1] === 40 && grid[i-1][j+1] === 40){
                        if(grid[i][j - 1] != 40  && grid[i+1][j-1] != 40 && grid[i-1][j-1] != 40 && grid[i+1][j+2] != 40 && grid[i-1][j+2] != 40){
                            const leftImgSrc = Math.floor(Math.random() * 4);
                            const rightImgSrc = Math.floor(Math.random() * 4);

                            const leftValue = {
                                src: leftImgSrc,
                                x: j,
                                y: i,
                                width: pathEdgeDims[leftImgSrc][0],
                                height: pathEdgeDims[leftImgSrc][1],
                                angle: 0,
                            };

                            const rightValue = {
                                src: rightImgSrc,
                                x: j + 2,
                                y: i,
                                width: pathEdgeDims[rightImgSrc][0],
                                height: pathEdgeDims[rightImgSrc][1],
                                angle: 0,
                                transform: `scaleX(-1)`,
                            };

                            cordList.push(leftValue);
                            cordList.push(rightValue);
                        }
                    }
                }
            }
        }
    }
    return cordList;
}

function getHorizontalPathEdges(grid){
    const cordList = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 40){ // it is a path
                if(grid[i][j+1] === 40 && grid[i][j-1] === 40){ // Left and right is a path
                    if(grid[i + 1][j - 1] != 40 && grid[i + 1][j + 1] != 40 && grid[i+1][j] != 40 && grid[i - 1][j+1] != 40 && grid[i-1][j-1] != 40 && grid[i-1][j] != 40){ // No path on the sides 
                        const upImgSrc = 1;
                        const downImgSrc = 0;

                        const upValue = {
                            src: upImgSrc,
                            x: j,
                            y: i - 1,
                            width: pathEdgeDims[upImgSrc][0],
                            height: pathEdgeDims[upImgSrc][1],
                            angle: 90,
                            transform: `rotate(90deg)`,
                        };

                        const downValue = {
                            src: upImgSrc,
                            x: j,
                            y: i - 0.1,
                            width: pathEdgeDims[downImgSrc][0],
                            height: pathEdgeDims[downImgSrc][1],
                            angle: 90,
                            transform: `rotate(280deg)`,
                        };

                        cordList.push(upValue);
                        cordList.push(downValue);
                    }
                }
            }
        }
    }

    return cordList;

}

function getWideHorizontalPathEdges(grid){
    const cordList = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === 40){ // it is a path
                // Check for a with x2 horizontal stragight path
                if(grid[i+1][j] === 40 && grid[i+2][j] != 40){
                    if(grid[i][j+1] === 40 && grid[i][j-1] === 40 && grid[i+1][j+1] === 40 && grid[i+1][j-1] === 40){
                        if(grid[i - 1][j - 1] != 40  && grid[i+2][j-1] != 40 && grid[i-1][j] != 40 && grid[i+2][j+1] != 40 && grid[i-1][j+1] != 40){
                            const upImgSrc = 1;
                            const downImgSrc = 0;

                            const upValue = {
                                src: upImgSrc,
                                x: j,
                                y: i - 2,
                                width: pathEdgeDims[upImgSrc][0],
                                height: pathEdgeDims[upImgSrc][1],
                                angle: 90,
                                transform: `rotate(90deg)`,
                            };

                            const downValue = {
                                src: upImgSrc,
                                x: j,
                                y: i - 0.2,
                                width: pathEdgeDims[downImgSrc][0],
                                height: pathEdgeDims[downImgSrc][1],
                                angle: 90,
                                transform: `rotate(280deg)`,
                            };

                            cordList.push(upValue);
                            cordList.push(downValue);
                        }
                    }
                }
            }
        }
    }
    return cordList;
}




// ------------------------------------------------------------------------------------------------

export {
    imageCodes,
    getTreeCords,
    getClstrRockCords,
    getBuildingCords,
    getCaveCords,
    getCampCords,
    getPathEdges,
    getHorizontalPathEdges,
    getWideVerticalPathEdges,
    getWideHorizontalPathEdges,
};