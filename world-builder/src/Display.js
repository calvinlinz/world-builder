import React from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import Grid from './Grid';

const Display = ({ worldData }) => {
  return (
    <>
    <ConfigDropdown/>
    <Grid />
    </>
  );
};

export default Display;
