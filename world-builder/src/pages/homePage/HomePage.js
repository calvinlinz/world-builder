import React, { useState } from "react";
import "./HomePage.css";
import { WorldDataContext } from "../../context/worldDataContext";
import { useContext } from "react";

const HomePage = ({ startGame }) => {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";
  const { setHost, host, setGameId } = useContext(WorldDataContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {

    if (e.key === "Enter") {
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
        if(response.status === 200){
          setGameId(inputValue);
          startGame();
        }else{
          if(host){
            alert("Game ID already exists");
          }else{
            alert("Game ID does not exist");
          }
        }
      }).catch((error) => {
        console.log(error);
      });
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
