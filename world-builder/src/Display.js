import React, {useEffect, useState} from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";
import CaveGrid from './CaveGrid';
import RoofGrid from './RoofGrid';
import CampGrid from './CampGrid';
import './Grid.css';

const Display = ({ worldData }) => {
  const [opacityValue, setOpacity] = useState(1); 
  const [scaleFactor, setScaleFactor] = useState(0.33);

  const toggleOpactiy = () => {
    setOpacity(opacityValue === 1 ? 0 : 1);
  };

  const setScaleFactorImages = (e) =>{
    setScaleFactor(e/10);
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
    console.log(scaleFactor);
  };

  return (
    <>
    
    <BackgroundGrid/>
    <BuildingsGrid scaleFactor={scaleFactor}/>
    <NaturalFeaturesGrid scaleFactor={scaleFactor}/>
    <ConfigDropdown opacityToggle={toggleOpactiy} setScaleFactorImages={setScaleFactorImages}/>
    <CaveGrid scaleFactor={scaleFactor}/>
    <RoofGrid opacityValue={opacityValue} scaleFactor={scaleFactor}/>
    <CampGrid scaleFactor={scaleFactor}/>

    </>
  );
};

export default Display;


