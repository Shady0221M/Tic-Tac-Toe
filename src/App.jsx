import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/Gameboard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-comb.jsx";
import GameOver from "./components/Gameover.jsx";

const gameblocks=[[null,null,null],[null,null,null],[null,null,null],];
function deriveActivePlayer(gameTurns){
      let currentPlayer='X';
      if(gameTurns.length>0 &&  gameTurns[0].player=='X') {currentPlayer='O';}
      return currentPlayer;
}

function deriveWinner(gameboard,players){
  let winner;
    for(const combination of WINNING_COMBINATIONS){
      const firstSymbol=gameboard[combination[0].row][combination[0].column];
      const secondSymbol=gameboard[combination[1].row][combination[1].column];
      const thirdSymbol=gameboard[combination[2].row][combination[2].column];
      // console.log(combination[0].row," ",secondSymbol," ",thirdSymbol," ");
      if(firstSymbol && firstSymbol===secondSymbol && firstSymbol===thirdSymbol){
        winner=players[firstSymbol]; break;
      }
    }
  return winner;
}

function DeriveBoard(gameTurns){
  let gameboard=[...gameblocks.map(row=> ([...row ]))];
  
    for(const turn of gameTurns){
        const { square , player }=turn;
        const {row, col}=square;
        gameboard[row][col]=player;
    }

  return gameboard;
}
function App() {
  const [gameTurns,setGameTurns]=useState([]);
  const [players,setPlayers]=useState({X:'Player 1',O:'Player 2'});
  // const [hasWinner,setHasWinner]=useState(false);
  //const [activePlayer,setActivePlayer]=useState("X");
  const activePlayer=deriveActivePlayer(gameTurns);
  
  

    const gameboard=DeriveBoard(gameTurns);
    const winner=deriveWinner(gameboard,players);
  
  function handleTogglePlayer(rowIndex,colIndex){
    // setActivePlayer((currentPlayer)=>{
    //   return (currentPlayer==="X") ? "O" : "X" ;
    // });
    
    
    setGameTurns((prevTurns)=>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      const updatedTurns=[{ square : {row:rowIndex,col:colIndex} , player : currentPlayer }, ...prevTurns ];
      return updatedTurns;
    });
  }
  function handlePlayerChangeName(symbol,newName){
    setPlayers((oldName)=>{
      const newPlayer={...oldName};
      newPlayer[symbol]=newName;
      return newPlayer;
    });
  }
  const hasDraw=(gameTurns.length==9 && !winner);
  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" onChange={handlePlayerChangeName} isActive={activePlayer==='X'}/>
          <Player initialName="Player 2" symbol="O" onChange={handlePlayerChangeName} isActive={activePlayer==='O'}/>
        </ol>
        {(winner || hasDraw)? (<GameOver winner={winner} rematch={handleRematch}/>) :null }
        <GameBoard onSelectSquare={handleTogglePlayer} board={gameboard}/>
        
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
