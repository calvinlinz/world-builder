import React, {useEffect, useState} from 'react';
import ConfigDropdown from './components/configuration/Configuration';
import MonstersOverlay from './components/configuration/MonstersOverlay';
import Grid from './Grid';
import BackgroundGrid from './BackgroundGrid';
import BuildingsGrid from "./BuildingsGrid";
import NaturalFeaturesGrid from "./NaturalFeaturesGrid";
import CaveGrid from './CaveGrid';
import RoofGrid from './RoofGrid';
import CampGrid from './CampGrid';
import MonsterGrid from './MonsterGrid';
import LoadingPage from './LoadingPage';
import './Grid.css';
import './Display.css';


const Display = ({ worldData }) => {
  const [opacityValue, setOpacity] = useState(1); 
  const [scaleFactor, setScaleFactor] = useState(0.25);

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
    <BackgroundGrid worldData={worldData}/>
    <BuildingsGrid scaleFactor={scaleFactor} worldData={worldData}/>
    <NaturalFeaturesGrid scaleFactor={scaleFactor} worldData={worldData}/>
    <ConfigDropdown opacityToggle={toggleOpactiy} setScaleFactorImages={setScaleFactorImages}/>
    <CaveGrid scaleFactor={scaleFactor} worldData={worldData}/>
    <RoofGrid opacityValue={opacityValue} scaleFactor={scaleFactor} worldData={worldData}/>
    <CampGrid scaleFactor={scaleFactor} worldData={worldData}/>
    <MonsterGrid worldData={worldData} scaleFactor={scaleFactor}/>
    <div className='frame'></div>
    <div className='square-one'></div>
    <div className='square-two'></div>
    <div className='square-three'></div>
    <div className='square-four'></div>
    <LoadingPage/>
    </>
  );
};

export default Display;


