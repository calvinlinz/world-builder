import React from "react";
import styles from "./playerCount.module.css";
import { WorldDataContext } from "../../context/worldDataContext";
import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";

const PlayerCount = () => {
    const { currentPlayersInGame } = useContext(WorldDataContext);
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.box}>
        <div className={styles.icon}>
            <PersonIcon />
          </div>
          <div className={styles.count}>
            <p>{currentPlayersInGame}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerCount;
