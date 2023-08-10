import React from 'react';
import Grid from './Grid';
import ConfigDropdown from './components/configuration/Configuration';

const Display = ({ worldData }) => {
  return (
    <>
    <ConfigDropdown/>
    <Grid />
    </>
  );
};

export default Display;
