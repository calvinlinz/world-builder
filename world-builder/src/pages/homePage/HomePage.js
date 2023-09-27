import React, { useState } from "react";
import { WorldDataContext } from "../../context/worldDataContext";
import { useContext } from "react";
import styles from "./homePage.module.css";
import { ToastContainer, toast } from "react-toastify";

const HomePage = ({ startGame }) => {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const { setHost, host, setGameId } = useContext(WorldDataContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const notifyError = (message) => toast.error(message);

  const handleKeyPress = (e) => {
    if (e == null || e.key === "Enter") {
      if (inputValue.length == 0) {
        alert("Please enter a game ID");
        return;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: inputValue,
          host: host,
        }),
      };
      fetch(API_URL + "/game/check", options)
        .then((response) => {
          if (response.status === 200) {
            setGameId(inputValue);
            startGame();
          } else {
            if (host) {
              notifyError("Game ID already exists")
            } else {
              notifyError("Game ID does not exist")
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className={styles.homepage}>
        {!buttonClicked ? (
          <header className={styles.hero}>
            <h1>
              DUNGEONS AND DRAGONS<br></br>MAP GENERATOR
            </h1>
            <p>
              <b>YOUR ADVENTURE AWAITS...</b>
            </p>
            <button
              onClick={() => {
                setHost(false);
                setButtonClicked(true);
              }}
            >
              <b>
                PLAY AS <i>ADVENTURER</i>
              </b>
            </button>
            <button
              onClick={() => {
                setHost(true);
                setButtonClicked(true);
              }}
            >
              <b>
                PLAY AS <i>DUNGEON MASTER</i>
              </b>
            </button>
          </header>
        ) : (
          <div className={styles.gameIdBody}>
            <h1>{host ? "HOST" : "PLAYER"}</h1>
            <div className={styles.gameIdContainer}>
              <div className={styles.gameIdInput}>
                <input
                  type="text"
                  placeholder={host ? "Create Game ID" : "Enter Game ID"}
                  value={inputValue}
                  onKeyPress={handleKeyPress}
                  onChange={handleInputChange}
                ></input>
              </div>
              <button onClick={() => handleKeyPress(null)}>PLAY</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default HomePage;
