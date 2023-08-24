import React, {useEffect, useState} from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";
import CaveGrid from './CaveGrid';
import RoofGrid from './RoofGrid';

const Display = ({ worldData }) => {
  const [opacityValue, setOpacity] = useState(1); 

  const toggleOpactiy = () => {
    setOpacity(opacityValue === 1 ? 0 : 1);
  };

  return (
    <>
    
    <BackgroundGrid/>
    <BuildingsGrid/>
    <NaturalFeaturesGrid/>
    <ConfigDropdown opacityToggle={toggleOpactiy}/>
    <CaveGrid/>
    <RoofGrid opacityValue={opacityValue}/>

    </>
  );
};

export default Display;


