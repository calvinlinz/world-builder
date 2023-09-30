import React from "react";
import styles from "./playerCount.module.css";
import { WorldDataContext } from "../../context/worldDataContext";
import { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {toast} from "react-toastify"
const notifySuccess = (message) => toast.success(message);

const PlayerCount = () => {
  const { currentPlayersInGame, gameId ,host} = useContext(WorldDataContext);
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <PersonIcon />
          </div>
          <div className={styles.type}>
            <p>{host? "HOST" : "PLAYER"}</p>
          </div>
        </div>
        <div className={styles.box2}>
          <div className={styles.count} onClick={()=>{navigator.clipboard.writeText(gameId); notifySuccess("Copied Game ID: " + gameId)}}>
            <p>Game ID: {gameId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerCount;
