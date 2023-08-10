import React from 'react';

const HomePage = ({ startGame }) => {
  return (
    <>
    <div className="homepage">
      <header className="hero">
        <h1>Dungeons & Dragons Map Generator</h1>
        <p><b>Embark on an exciting journey as a Dungeon Master.</b></p>
        <button onClick={startGame}>Generate Map</button>
      </header>
    </div>
    </>
  );
};

export default HomePage;
