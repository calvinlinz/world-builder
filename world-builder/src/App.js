import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./HomePage";
import Display from "./Display";
import {setGrid} from "./CalculatePositions"

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
  const [worldData, setWorldData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch the data from your backend endpoint
    fetch("http://localhost:8080/world")
      .then((response) => response.json())
      .then((data) => {setWorldData(data); setGrid(data);})
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        <Display worldData={worldData} />
      ) : (
        <HomePage startGame={startGame} />
      )}
    </div>
  );
}

export default App;
