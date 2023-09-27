import React, { useState } from "react";
import "./HomePage.css";
import { WorldDataContext } from "../../context/worldDataContext";
import { useContext } from "react";

const HomePage = ({ startGame}) => {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://10.140.45.67:8080";
  const { setHost, host, setGameId } = useContext(WorldDataContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (host) {
        console.log("Creating game with ID:", inputValue);
        setGameId(inputValue);
      } else {
        console.log("Joining game with ID:", inputValue);
        setGameId(inputValue);
      }
      startGame();
    }
  };
  return (
    <>
      <div className="homepage">
        {!buttonClicked ? (
          <header className="hero">
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
          <div>
            <input
              type="text"
              placeholder={!host ? "Enter Game Id" : "Create Game Id"}
              style={{ width: "200px", height: "50px" }}
              value={inputValue}
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
            ></input>
          </div>
        )}
      </div>
    </>
  );
};
export default HomePage;
