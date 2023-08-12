import React from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";

const Display = ({ worldData }) => {
  return (
    <>
    <ConfigDropdown/>
    <BackgroundGrid/>
    <BuildingsGrid/>
    <NaturalFeaturesGrid/>

    </>
  );
};

export default Display;
