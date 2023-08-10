import React from 'react';
import './HomePage.css';

const HomePage = ({ startGame }) => {
  return (
    <>
    <div className="homepage">
      <header className="hero">
        <h1>Dungeons & Dragons Map Generator</h1>
        <p><b>Your adventure awaits...</b></p>
        <button onClick={startGame}>Play as Adventurer</button>
        <button onClick={startGame}>Play as Dungeon Master</button>
      </header>
    </div>
    </>
  );
};
export default HomePage;
