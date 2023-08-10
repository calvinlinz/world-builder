import React from 'react';
import Grid from './Grid';

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
    <Grid />
    </>
  );
};

export default Display;
