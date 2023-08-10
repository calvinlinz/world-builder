import React from 'react';

const Display = ({ worldData }) => {
  return (
    <>
    <ul>
      {Array.isArray(worldData) ? (
        worldData.map((item) => <li key={item.id}>{item.name}</li>)
      ) : (
        <li key={worldData.id}>{worldData.name}</li>
      )}
    </ul>
    </>
  );
};

export default Display;
