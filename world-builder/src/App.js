import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./HomePage";
import Display from "./Display";
import { setGrid } from "./CalculatePositions";
import { WorldDataContext } from "./context/worldDataContext";

function rotateMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;


  // Create a new empty matrix with swapped dimensions
  const rotatedMatrix = new Array(cols)
    .fill(null)
    .map(() => new Array(rows).fill(null));

  // Transpose the matrix (swap rows and columns)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotatedMatrix[j][i] = matrix[i][j];
    }
  }

  // Reverse the order of the columns
  for (let i = 0; i < cols; i++) {
    rotatedMatrix[i] = rotatedMatrix[i].reverse();
  }

  return rotatedMatrix;
}

function App() {
  const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080"

  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch the data from your backend endpoint
    fetch(API_URL+"/world", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        size:27
      })
    }).then((response)=>response.json()).then((data)=>setWorldData(data)).catch((error)=>console.log(error));
  }, []);

  const startGame = () => {
    setGameStarted(true);
    console.log(worldData);
  };

  return (
    <WorldDataContext.Provider value={{
      worldData: worldData,
      setWorldData: (worldData) => {
        setWorldData(worldData);
      },
    }}
  >
      <div className="App">
        {gameStarted ? (
          <Display worldData={worldData} />
        ) : (
          <HomePage startGame={startGame} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
