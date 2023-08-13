import React from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";
import CaveGrid from './CaveGrid';

const Display = ({ worldData }) => {
  return (
    <>
    
    <BackgroundGrid/>
    {/* <BuildingsGrid/>
    <NaturalFeaturesGrid/>
    <ConfigDropdown/> */}
    <CaveGrid/>

    </>
  );
};

export default Display;
