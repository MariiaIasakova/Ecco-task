import React, { useState } from 'react';

import { Chessboard } from '../Chessboard';
import { InputNotations, NotationInfo } from '../Notation';

import './App.css';

const App = () => {
  const [notations, setNotations] = useState("");

  return (
    <div id="app-container">
      <InputNotations setPositions={setNotations}/>
      <NotationInfo positions={notations}/>
      <Chessboard piecePlacements={notations.piecePlacements}/>
    </div>
  );
}

export default App;
