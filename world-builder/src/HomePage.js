import React from 'react';
import './HomePage.css';

const HomePage = ({ startGame }) => {
  return (
    <>
    <div className="homepage">
      <header className="hero">
        <h1>DUNGEONS AND DRAGONS<br></br>MAP GENERATOR</h1>
        <p><b>YOUR ADVENTURE AWAITS...</b></p>
        <button onClick={startGame}><b>PLAY AS <i>ADVENTURER</i></b></button>
        <button onClick={startGame}><b>PLAY AS <i>DUNGEON MASTER</i></b></button>
      </header>
    </div>
    </>
  );
};
export default HomePage;
