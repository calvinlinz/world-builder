import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Display from "./pages/display/Display";
import { setGrid } from "./grids/CalculatePositions";
import { WorldDataContext } from "./context/worldDataContext";
import Loading from './components/loading/loading'



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
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Fetch the data from your backend endpoint
    setLoading(true);
    fetch(API_URL+"/world", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        size:27
      })
    }).then((response)=>response.json())
    .then((data)=>{setWorldData(data);setLoading(false)})
    .catch((error)=>console.log(error));
  }, []);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <WorldDataContext.Provider value={{
      worldData: worldData,
      setWorldData: (worldData, loading) => {
        setWorldData(worldData);
        setLoading(loading);
      },
    }}
  >
      <div className="App">
        {gameStarted ? (
          <Display worldData={worldData} loading={loading} setLoading={setLoading}/>
        ) : (
          <HomePage startGame={startGame} />
        )}
      </div>
    </WorldDataContext.Provider>
  );
}

export default App;
