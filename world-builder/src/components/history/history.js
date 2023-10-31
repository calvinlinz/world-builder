import React, { useState, useContext, useEffect } from "react";
import styles from "./history.module.css";
import "../../grids/Grid.css";
import { WorldDataContext } from "../../context/worldDataContext";
import { allImages } from '../../grids/Constants';
import { getBuildingCords, getCaveCords } from "../../grids/CalculatePositions";

const History = () => {
  const { setWorldData, setBuildingCords, setCaveCords, history } = useContext(WorldDataContext);

  const imageMapping = {
    0: allImages.forestGrass.grass1,
    1: allImages.forestGrass.grass3,
};

  const update = (data) =>{
    setWorldData(data, false);
    const buildingCords = getBuildingCords(data);
    const caveCords = getCaveCords(data);
    setBuildingCords(buildingCords);
    setCaveCords(caveCords);
  }


  return (
    <div className={styles.body}>
      <div className={styles.configContent}>
        <h2>
          <b>HISTORY</b>
        </h2>
        <div className={styles.sliderComponent}>
          {history.map((item, index) => (
            <div
              className={styles.historyItem}
              key={index}
              onClick={() =>update(item)}
            >
              <div className={styles.picture}>
                <img src={imageMapping[Math.floor(Math.random() * (2))]} ></img>
              </div>
              <div className={styles.header}>
                <p>WORLD {index + 1}</p>
              </div>
            </div>
          ))}
          <div className={styles.filler}>
            <div className={styles.fillerHeader}>
              <p> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
