import React from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { getAbovePathEdge, getBelowPathEdge, getLeftPathEdge, getRightPathEdge} from './CalculatePositions';

const PathGrid = ({scaleFactor, worldData}) => {
    const grid = worldData;

    const abovePathEdges = getAbovePathEdge(worldData);
    const belowPathEdges = getBelowPathEdge(worldData);
    const leftPathEdges = getLeftPathEdge(worldData);
    const rightPathEdges = getRightPathEdge(worldData);
    
    const pathImageMapping = {
        0: allImages.pathEdgeImages.path_edge1,
        1: allImages.pathEdgeImages.path_edge2,
        2: allImages.pathEdgeImages.path_edge3,
        3: allImages.pathEdgeImages.path_edge4,
        4: allImages.pathEdgeImages.path_end,
    }; 

      const abovePathEdgeImages = abovePathEdges.map((image, index) => {
        const imageStyle = {
              transform: `${image.transform}`,
              position: "absolute",
              left: `${image.x + 7.3 + (image.x * 0.030)}vw`,
              top: `${image.y + 2 - (image.y * 0.02)}vw`,
              width: `${image.width}vw`,
              
          };
        return (
            <img
            key={index}
            src={pathImageMapping[image.src]}
            alt={`Image ${index + 1}`}
            className = {"grid-container-path-edge"}
            style={imageStyle}
          />
        );
      });

      const belowPathEdgeImages = belowPathEdges.map((image, index) => {
        const imageStyle = {
              transform: `${image.transform}`,
              position: "absolute",
              left: `${image.x + 7.3 + (image.x * 0.030)}vw`,
              top: `${image.y + 2 - (image.y * 0.02)}vw`,
              width: `${image.width}vw`,
              
          };
        return (
            <img
            key={index}
            src={pathImageMapping[image.src]}
            alt={`Image ${index + 1}`}
            className = {"grid-container-path-edge"}
            style={imageStyle}
          />
        );
      });

      const leftPathEdgeImages = leftPathEdges.map((image, index) => {
        const imageStyle = {
              transform: `${image.transform}`,
              position: "absolute",
              left: `${image.x + 7.3 + (image.x * 0.030)}vw`,
              top: `${image.y + 1}vw`,
              width: `${image.width}vw`,
              
          };
        return (
            <img
            key={index}
            src={pathImageMapping[image.src]}
            alt={`Image ${index + 1}`}
            className = {"grid-container-path-edge"}
            style={imageStyle}
          />
        );
      });

      const rightPathEdgesImages = rightPathEdges.map((image, index) => {
        const imageStyle = {
              transform: `${image.transform}`,
              position: "absolute",
              left: `${image.x + 7.3 + (image.x * 0.030)}vw`,
              top: `${image.y + 1}vw`,
              width: `${image.width}vw`,
              
          };
        return (
            <img
            key={index}
            src={pathImageMapping[image.src]}
            alt={`Image ${index + 1}`}
            className = {"grid-container-path-edge"}
            style={imageStyle}
          />
        );
      });




    return (
        <div>
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
            {abovePathEdgeImages}
            {belowPathEdgeImages}
            {leftPathEdgeImages}
            {rightPathEdgesImages}

        </div>
        
    );


};

export default PathGrid;