import React from 'react';
import './Grid.css';
import { allImages } from './Constants';
import { getPathEdges, getHorizontalPathEdges} from './CalculatePositions';

const PathGrid = ({scaleFactor, worldData}) => {
    const grid = worldData;
    const pathEdgeCords = getPathEdges(worldData);
    const horizontalPathEdges = getHorizontalPathEdges(worldData);
    
    const pathImageMapping = {
        0: allImages.pathEdgeImages.path_edge1,
        1: allImages.pathEdgeImages.path_edge2,
        2: allImages.pathEdgeImages.path_edge3,
        3: allImages.pathEdgeImages.path_edge4,
    };

    const pathEdgeImages = pathEdgeCords.map((image, index) => {
        console.log(pathEdgeCords)
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

      const horizontalPathEdgesImages = horizontalPathEdges.map((image, index) => {
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
            {pathEdgeImages}
            {horizontalPathEdgesImages}

        </div>
        
    );


};

export default PathGrid;